module.exports.getHttpWeb3 = function(host) {
    return new Web3(host);
}

module.exports.importOrCreateUser = function(web3, pkString) {
    if(pkString) {
        return web3.eth.accounts.privateKeyToAccount('0x' + pkString);
    } else {
        return web3.eth.accounts.create();
    }
}

module.exports.initUser = function(web3) {
    var pkString = prompt("Insert your Private Key");
    return module.exports.importOrCreateUser(web3, pkString);
}

module.exports.reloadUserPanel = function(user, web3) {
    // Set the address label
    $('#address').text(user.address);

    // Set the balance label
    web3.eth.getBalance(user.address, function (error, balance) {
        if (error !== null) {
            console.error('Error getting account balance');
        }
        var ethBalance = web3.utils.fromWei(balance).toString();
        $('#balance').text(ethBalance + " ETH");
    });

    // Set the transaction count label
    web3.eth.getTransactionCount(user.address, function (error, transactionCount) {
        if (error !== null) {
            console.error('Error getting account transaction count');
        }
        var transactionCountStr = transactionCount.toString();
        $('#transaction-count').text(transactionCountStr);
    });
}

module.exports.sendEthToAccount = function(toAddress, amountEth, user, gasPrice, gas, web3, callback) {
    var txParams = {
        to: toAddress,
        value: web3.utils.toWei(amountEth),
        from: user.address,
        gasPrice: gasPrice,
        gas: gas
    };

    web3.eth.sendTransaction(txParams, callback);
}

module.exports.reloadCryptogotchiPanel = function(user, Sifrasia) {
    Sifrasia.methods.getCryptogotchiByAddress(user.address).call(function (error, cryptogotchi) {
        if(error !== null) {
            console.error(error);
        }

        if (cryptogotchi[0] === '0x0000000000000000000000000000000000000000') {
            // It's empty, allow hatching
            alert('You dont have a Cryptogotchi, try to create one!');
            $('#hatch-btn').prop('disabled', false);
            $('#name').prop('disabled', false).val(null);
            $('#description').prop('disabled', false).val(null);
            $('#color').prop('disabled', false).val(null);
        } else {
            // There's a cryptogotchi, disable hatching
            alert('Here is your Cryptogotchi!');
            $('#hatch-btn').prop('disabled', true);
            $('#name').prop('disabled', true).val(cryptogotchi[2]);
            $('#description').prop('disabled', true).val(cryptogotchi[3]);
            $('#color').prop('disabled', true).val(cryptogotchi[4]);
            $('#cryptogotchi-image').css("background-color", cryptogotchi[4]);
        }
    });
}

module.exports.hatchCryptogotchi = function(user, Sifrasia, name, description, color) {
    Sifrasia.methods.hatchCryptogotchi(name, description, color).send({from: user.address}, function(error, txHash) {
        if(error !== null) {
            console.error(error);
        }

       module.exports.reloadCryptogotchiPanel(user, Sifrasia);
    });
}