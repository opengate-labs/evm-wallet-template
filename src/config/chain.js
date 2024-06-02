const Ocean = {
  id: 4058,
  name: "Ocean",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc1.ocean.bahamut.io"],
      webSocket: ["wss://ws1.ocean.bahamut.io"],
    },
    public: {
      http: ["https://rpc1.ocean.bahamut.io"],
      webSocket: ["wss://ws1.ocean.bahamut.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://ocean.ftnscan.com",
      apiUrl: "https://ocean.ftnscan.com/api",
    },
  },
};

export default Ocean;
