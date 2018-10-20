// Modules
const Utils = require("./utils");
const SifrasiaContractJSON = require('./abi/Sifrasia.json');
console.log(SifrasiaContractJSON.abi);

// Constants
const GAS_PRICE = '0x1';
const GAS = '0x3B9AC9FF';
const SIFRASIA_ADDRESS = '0xa936acd9d57cf8b11ea42985045ff7a9db9008e6';

// State
var globalWeb3 = Utils.getHttpWeb3('http://localhost:8545');
var globalUser = null;
var Sifrasia = new globalWeb3.eth.Contract(SifrasiaContractJSON.abi, SIFRASIA_ADDRESS, {
    gas: GAS,
    gasPrice: GAS_PRICE
});

// App
$(document).ready(function(){
    // Initialize user
    globalUser = Utils.initUser(globalWeb3);

    // Reload the user panel
    Utils.reloadUserPanel(globalUser, globalWeb3);
    Utils.reloadCryptogotchiPanel(globalUser, Sifrasia);

    // Reloads the account panel information
    $('#reload-account-btn').click(function() {
        Utils.reloadUserPanel(globalUser, globalWeb3);
    });

    // Sends eth to the specified account
    $('#send-transaction').submit(function(event) {
        event.preventDefault();
        var toAddress = $('#to-address').val();
        var amount = $('#amount').val();
        Utils.sendEthToAccount(toAddress, amount, globalUser, GAS_PRICE, GAS, globalWeb3, function(error, txHash) {
            if(error !== null) {
                console.error(error);
            } else {
                alert(txHash);
            }
            Utils.reloadUserPanel(globalUser, globalWeb3);
        });
    });

    // Hatchs a cryptogotchi
    $('#cryptogotchi-creation').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var description = $('#description').val();
        var color = $('#color').val();

        Utils.hatchCryptogotchi(globalUser, Sifrasia, name, description, color);
    })
});