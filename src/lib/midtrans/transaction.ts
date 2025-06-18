import snap from "./init";

const createTransaction = async (params: any, callback: Function) => {
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      callback(transaction);
    });
};

const getTransactionStatus = async (token: string, callback: Function) => {
  snap.transaction
    .status(token)
    .then((res: any) => {
      callback(res);
    })
    .catch((err: any) => {
      console.log("Midtrans Status Error", err);
      callback(err);
    });
};

export { createTransaction, getTransactionStatus };
