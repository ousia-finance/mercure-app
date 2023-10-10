export type CollateralizedDebt = {
  version: "0.1.0";
  name: "collateralized_debt";
  instructions: [
    {
      name: "createNewAsset";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "assetAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "priceFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mintAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "reverseQuotes";
          type: "bool";
        },
        {
          name: "interestRate";
          type: "u8";
        },
        {
          name: "minCollateralRatio";
          type: "u16";
        }
      ];
    },
    {
      name: "openPosition";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "assetAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "positionAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "priceFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "createKey";
          isMut: false;
          isSigner: true;
        },
        {
          name: "mintAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "associatedTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "mintAmount";
          type: "u64";
        },
        {
          name: "mintingTokenReverseQuotes";
          type: "bool";
        }
      ];
    },
    {
      name: "liquidate";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "positionAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "collectInterest";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "positionAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "positionAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "lastCollectedInterest";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "assetAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feed";
            type: "publicKey";
          },
          {
            name: "reversedQuote";
            type: "bool";
          },
          {
            name: "minCollateralRatio";
            type: "u16";
          },
          {
            name: "interestRateBp";
            type: "u8";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "AllAssets";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokens";
            type: {
              vec: {
                defined: "TokenInfo";
              };
            };
          }
        ];
      };
    },
    {
      name: "TokenInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "priceFeed";
            type: "publicKey";
          },
          {
            name: "decimals";
            type: "u8";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "PythError";
      msg: "Could not load price account";
    },
    {
      code: 6001;
      name: "TryToSerializePriceAccount";
      msg: "Failed to serialize price account";
    },
    {
      code: 6002;
      name: "PythPriceTooOld";
      msg: "Price account latest update is too old to safely provide a price";
    },
    {
      code: 6003;
      name: "InvalidArgument";
      msg: "Invalid argument provided";
    },
    {
      code: 6004;
      name: "MissingTokenAccounts";
      msg: "One or more token accounts are missing, please add them in remaining accounts";
    },
    {
      code: 6005;
      name: "MissingPriceFeedAccounts";
      msg: "One or more price feeds are missing, please add them in remaining accounts";
    }
  ];
};

export const IDL: CollateralizedDebt = {
  version: "0.1.0",
  name: "collateralized_debt",
  instructions: [
    {
      name: "createNewAsset",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "assetAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "priceFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mintAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "reverseQuotes",
          type: "bool",
        },
        {
          name: "interestRate",
          type: "u8",
        },
        {
          name: "minCollateralRatio",
          type: "u16",
        },
      ],
    },
    {
      name: "openPosition",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "assetAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "positionAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "priceFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "createKey",
          isMut: false,
          isSigner: true,
        },
        {
          name: "mintAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "mintAmount",
          type: "u64",
        },
        {
          name: "mintingTokenReverseQuotes",
          type: "bool",
        },
      ],
    },
    {
      name: "liquidate",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "positionAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "collectInterest",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "positionAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "positionAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "lastCollectedInterest",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "assetAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "feed",
            type: "publicKey",
          },
          {
            name: "reversedQuote",
            type: "bool",
          },
          {
            name: "minCollateralRatio",
            type: "u16",
          },
          {
            name: "interestRateBp",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "AllAssets",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokens",
            type: {
              vec: {
                defined: "TokenInfo",
              },
            },
          },
        ],
      },
    },
    {
      name: "TokenInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "priceFeed",
            type: "publicKey",
          },
          {
            name: "decimals",
            type: "u8",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "PythError",
      msg: "Could not load price account",
    },
    {
      code: 6001,
      name: "TryToSerializePriceAccount",
      msg: "Failed to serialize price account",
    },
    {
      code: 6002,
      name: "PythPriceTooOld",
      msg: "Price account latest update is too old to safely provide a price",
    },
    {
      code: 6003,
      name: "InvalidArgument",
      msg: "Invalid argument provided",
    },
    {
      code: 6004,
      name: "MissingTokenAccounts",
      msg: "One or more token accounts are missing, please add them in remaining accounts",
    },
    {
      code: 6005,
      name: "MissingPriceFeedAccounts",
      msg: "One or more price feeds are missing, please add them in remaining accounts",
    },
  ],
};
