// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "./Token.sol";
contract Exchange {
    //收费的账户地址
    address public feeAccount;
    uint public feePercent;  //费率
    address  constant ETHER = address(0);

    struct _Order {
         uint id;
         address user;
         address tokenGet;
         uint amountGet;
         address tokenGive;
         uint  amountGive;
         uint timestamp;
    }
    
    mapping(address=> mapping(address=>uint)) public tokens;
    mapping(uint => _Order) public orders;
    uint public orderCount;

    mapping(uint=> bool) public orderCancel;
    mapping(uint=> bool) public orderFill;

    event Depost(address token, address user, uint amount, uint blance);
    event Withdraw(address token, address user, uint amount, uint blance);
    event Order(uint id,address user,address _tokenGet, uint _amountGet,address _tokenGive,uint _amountGive,uint timestamp);
    event Cancel(uint id,address user,address _tokenGet, uint _amountGet,address _tokenGive,uint _amountGive,uint timestamp);
    event Trade(uint id,address user,address _tokenGet, uint _amountGet,address _tokenGive,uint _amountGive,uint timestamp);

    constructor(address _feeAccount, uint _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositEther () payable public {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender] + msg.value;
        emit Depost(ETHER,msg.sender,msg.value,tokens[ETHER][msg.sender]);
    }

    function depositToken (address _token, uint _amount) public {
        require(_token!= address(0),'unvalid token');
        require(Token(_token).transferFrom(msg.sender,address(this),_amount),'trans fail');
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;
        emit Depost(_token,msg.sender,_amount,tokens[_token][msg.sender]);
    }

    function  withdrawEther (uint _amount) payable public {
        require(tokens[ETHER][msg.sender] >= _amount,'amount is no enough ') ;
         tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender] - _amount;
         payable(msg.sender).transfer(_amount);
         emit Withdraw(ETHER,msg.sender,_amount,tokens[ETHER][msg.sender]);
    }

    function  withdrawToken(address _token,uint _amount)  public {
        require(tokens[_token][msg.sender] >= _amount,'amount is no enough ') ;
         tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;
         Token(_token).transfer(msg.sender,_amount);
         emit Withdraw(_token,msg.sender,_amount,tokens[_token][msg.sender]);
    }

    function balanceOf(address _token,address _user) public view  returns(uint) {
        return tokens[_token][_user];
    }

    // makerOrder 
    function markOrder (address _tokenGet, uint _amountGet,address _tokenGive,uint _amountGive) public {
        orderCount +=1;
        orders[orderCount] = _Order(orderCount,msg.sender,_tokenGet,_amountGet,_tokenGive,_amountGive,block.timestamp);
        emit Order(orderCount,msg.sender,_tokenGet,_amountGet,_tokenGive,_amountGive,block.timestamp);
    }

    function cancelOrder (uint _id) public {
        _Order memory myorder = orders[_id];
        require(_id ==myorder.id,'no valid order');
        orderCancel[_id] = true;
        emit Cancel(_id, msg.sender,myorder.tokenGet,myorder.amountGet,myorder.tokenGive,myorder.amountGive,block.timestamp);
    }

    function fillOrder (uint _id) public {
          _Order memory myorder = orders[_id];
        require(_id == myorder.id,'no valid order');
        orderFill[_id] = true;
    
       uint feeAmount = myorder.amountGet * (feePercent/100);

        tokens[myorder.tokenGet][msg.sender] = tokens[myorder.tokenGet][msg.sender]- myorder.amountGet;
        tokens[myorder.tokenGet][myorder.user] = tokens[myorder.tokenGet][myorder.user] + myorder.amountGet;

        tokens[myorder.tokenGet][msg.sender] =  tokens[myorder.tokenGet][msg.sender]  -  feeAmount;
        tokens[myorder.tokenGet][feeAccount] =  tokens[myorder.tokenGet][feeAccount]  +  feeAmount;
       

        tokens[myorder.tokenGive][msg.sender] = tokens[myorder.tokenGive][msg.sender] + myorder.amountGive;
        tokens[myorder.tokenGive][myorder.user] = tokens[myorder.tokenGive][myorder.user]- myorder.amountGive;



        emit Trade(_id, msg.sender,myorder.tokenGet,myorder.amountGet,myorder.tokenGive,myorder.amountGive,block.timestamp);
    }
}