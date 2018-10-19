pragma solidity ^0.4.24;

/**
    The Sifrasia contract is the world where all the Cryptogotchi's live!
 */
contract Sifrasia {

    // Cryptogotchi model
    struct Cryptogotchi {
        address owner;
        uint index;
        string name;
        string description;
        string colorHex;
    }

    // State
    mapping (address => Cryptogotchi) cryptogotchis;
    address[] cryptogotchisIndex;

    // Events
    event CryptogotchiHatched(address _owner, uint _index, string _name, string _description, string _colorHex);

    // Functions

    /**
        Creates a new Cryptogotchi
    */
    function hatchCryptogotchi(string _name, string _description, string _colorHex) public {
        require(bytes(cryptogotchis[msg.sender].name).length == 0, "Sender already has a Cryptogotchi");

        // Create new Cryptogotchi
        Cryptogotchi memory newCryptogotchi;
        uint index = cryptogotchisIndex.length;
        newCryptogotchi.index = index;
        newCryptogotchi.owner = msg.sender;
        newCryptogotchi.name = _name;
        newCryptogotchi.description = _description;
        newCryptogotchi.colorHex = _colorHex;

        // Hatch it!
        cryptogotchis[msg.sender] = newCryptogotchi;
        cryptogotchisIndex.push(msg.sender);

        // Emit event
        emit CryptogotchiHatched(msg.sender, index, newCryptogotchi.name, newCryptogotchi.description, newCryptogotchi.colorHex);
    }

    /**
        Gets a Cryptogotchi by the owner's address
    */
    function getCryptogotchiByAddress(address _owner) public view returns (address, uint, string, string, string) {
        Cryptogotchi memory cryptogotchi = cryptogotchis[_owner];

        return (cryptogotchi.owner, cryptogotchi.index, cryptogotchi.name, cryptogotchi.description, cryptogotchi.colorHex);
    }

    /**
        Gets a Cryptogotchi by the index
    */
    function getCryptogotchiByIndex(uint _index) public view returns (address, uint, string, string, string) {
        address owner = cryptogotchisIndex[_index];

        return this.getCryptogotchiByAddress(owner);
    }

    /**
        Gets total amount of Cryptogotchis living in Sifrasia
    */
    function getCryptogotchiPopulationTotal() public view returns (uint) {
        return cryptogotchisIndex.length;
    }

}