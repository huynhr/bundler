import { Abi, AbiConstructor } from "abitype"

export const TestOpcodesAccountAbi: Exclude<Abi, AbiConstructor> = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "oldState",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newState",
                type: "uint256"
            }
        ],
        name: "State",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "eventSender",
                type: "address"
            }
        ],
        name: "TestMessage",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "contract IEntryPoint",
                name: "entryPoint",
                type: "address"
            }
        ],
        name: "addStake",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "enum IPaymaster.PostOpMode",
                name: "",
                type: "uint8"
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "postOp",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "rule",
                type: "string"
            }
        ],
        name: "runRule",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_state",
                type: "uint256"
            }
        ],
        name: "setState",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "sender",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "initCode",
                        type: "bytes"
                    },
                    {
                        internalType: "bytes",
                        name: "callData",
                        type: "bytes"
                    },
                    {
                        internalType: "uint256",
                        name: "callGasLimit",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "verificationGasLimit",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "preVerificationGas",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxFeePerGas",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxPriorityFeePerGas",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "paymasterAndData",
                        type: "bytes"
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes"
                    }
                ],
                internalType: "struct UserOperation",
                name: "userOp",
                type: "tuple"
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "validatePaymasterUserOp",
        outputs: [
            {
                internalType: "bytes",
                name: "context",
                type: "bytes"
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "sender",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "initCode",
                        type: "bytes"
                    },
                    {
                        internalType: "bytes",
                        name: "callData",
                        type: "bytes"
                    },
                    {
                        internalType: "uint256",
                        name: "callGasLimit",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "verificationGasLimit",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "preVerificationGas",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxFeePerGas",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxPriorityFeePerGas",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "paymasterAndData",
                        type: "bytes"
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes"
                    }
                ],
                internalType: "struct UserOperation",
                name: "userOp",
                type: "tuple"
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "missingAccountFunds",
                type: "uint256"
            }
        ],
        name: "validateUserOp",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    }
] as const

export const TestOpcodesAccountBytecode =
    "0x608060405234801561001057600080fd5b50610a2d806100206000396000f3fe6080604052600436106100555760003560e01c8063107679041461005a5780633a871cdd1461006f578063a9a23409146100a2578063a9e966b7146100c3578063cd330fb0146100e3578063f465c77e14610103575b600080fd5b61006d61006836600461066d565b610131565b005b34801561007b57600080fd5b5061008f61008a36600461069d565b61018f565b6040519081526020015b60405180910390f35b3480156100ae57600080fd5b5061006d6100bd3660046106f1565b50505050565b3480156100cf57600080fd5b5061006d6100de366004610780565b610239565b3480156100ef57600080fd5b5061008f6100fe3660046107af565b61027a565b34801561010f57600080fd5b5061012361011e36600461069d565b610490565b6040516100999291906108b8565b604051621cb65b60e51b8152600160048201526001600160a01b03821690630396cb609034906024016000604051808303818588803b15801561017357600080fd5b505af1158015610187573d6000803e3d6000fd5b505050505050565b600081156101e357604051600090339084908381818185875af1925050503d80600081146101d9576040519150601f19603f3d011682016040523d82523d6000602084013e6101de565b606091505b505050505b61022e6101f46101408601866108da565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061027a92505050565b506000949350505050565b60005460408051918252602082018390527fe56f542cbdb0e18291d73ec9fd0b443112d0b4f547479e1303ffbc1007cc4f0f910160405180910390a1600055565b604080518082019091526006815265373ab6b132b960d11b6020918201528151908201206000907ff648814c67221440671fd7c2de979db4020a9320fb7985ff79ca8e7dced277f8036102ce575043919050565b604080518082019091526008815267636f696e6261736560c01b6020918201528251908301207f76ec948a9207fdea26dcba91086bcdd181920ff52a539b0d1eb28e73b4cd92af03610321575041919050565b6040805180820190915260098152680c4d8dec6d6d0c2e6d60bb1b6020918201528251908301207fd60ee5d9b1a312631632d0ab8816ca64259093d8ab0b4d29f35db6a6151b0f8d0361037657505060004090565b60408051808201909152600781526631b932b0ba329960c91b6020918201528251908301207f8fac3d089893f1e87120aee7f9c091bedb61facca5e493da02330bcb46f0949c036103fa576040516001906103d090610661565b8190604051809103906000f59050801580156103f0573d6000803e3d6000fd5b5060009392505050565b604080518082019091526008815267656d69742d6d736760c01b6020918201528251908301207f9b68a4beda047bbcff1923196e9af52348c30a06718efbeffa6d1dcc2c0a40fe03610481576040513081527fc798341d2d62b28e8ed71452b00bdba7767fa7086ec2f2c695b40263a0eb7e909060200160405180910390a1506000919050565b61048a82610512565b92915050565b60606000806104a36101208701876108da565b6104b1916014908290610928565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293506104f4925083915061027a9050565b50506040805160208101909152600080825290969095509350505050565b6040805160208082019092526000908190528251918301919091207fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4700361055b57506000919050565b6040805180820190915260028152616f6b60f01b6020918201528251908301207f14502d3ab34ae28d404da8f6ec0501c6f295f66caa41e122cfa9b1291bc0f9e8036105a957506000919050565b60408051808201909152600481526319985a5b60e21b6020918201528251908301207f3b2564d7e0fe091d49b4c20f4632191e4ed6986bf993849879abfef9465def250361062a5760405162461bcd60e51b81526020600482015260096024820152686661696c2072756c6560b81b60448201526064015b60405180910390fd5b8160405160200161063b9190610952565b60408051601f198184030181529082905262461bcd60e51b825261062191600401610988565b605c8061099c83390190565b60006020828403121561067f57600080fd5b81356001600160a01b038116811461069657600080fd5b9392505050565b6000806000606084860312156106b257600080fd5b833567ffffffffffffffff8111156106c957600080fd5b840161016081870312156106dc57600080fd5b95602085013595506040909401359392505050565b6000806000806060858703121561070757600080fd5b84356003811061071657600080fd5b9350602085013567ffffffffffffffff8082111561073357600080fd5b818701915087601f83011261074757600080fd5b81358181111561075657600080fd5b88602082850101111561076857600080fd5b95986020929092019750949560400135945092505050565b60006020828403121561079257600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156107c157600080fd5b813567ffffffffffffffff808211156107d957600080fd5b818401915084601f8301126107ed57600080fd5b8135818111156107ff576107ff610799565b604051601f8201601f19908116603f0116810190838211818310171561082757610827610799565b8160405282815287602084870101111561084057600080fd5b826020860160208301376000928101602001929092525095945050505050565b60005b8381101561087b578181015183820152602001610863565b838111156100bd5750506000910152565b600081518084526108a4816020860160208601610860565b601f01601f19169290920160200192915050565b6040815260006108cb604083018561088c565b90508260208301529392505050565b6000808335601e198436030181126108f157600080fd5b83018035915067ffffffffffffffff82111561090c57600080fd5b60200191503681900382131561092157600080fd5b9250929050565b6000808585111561093857600080fd5b8386111561094557600080fd5b5050820193919092039150565b6d03ab735b737bbb710393ab6329d160951b81526000825161097b81600e850160208701610860565b91909101600e0192915050565b602081526000610696602083018461088c56fe6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea264697066735822122017008abca2698855515580737669ee3406bcc5c24fcc689b9e48f27893203dc964736f6c634300080f0033a26469706673582212208e6fea391812880ad76f9fdefb33ff54f62eec22ff0c2ce4f2e53cd288c259ae64736f6c634300080f0033"
