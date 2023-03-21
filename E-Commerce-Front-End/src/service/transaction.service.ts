import { Injectable } from '@angular/core';
import {contractABI, contractAddress} from "../utils/constants";
import {ethers} from "ethers";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  stage_1!:Boolean;

  private formData = { addressTo: '', amount: '', keyword: '', message: '' };
  private ethereum =  (window as any).ethereum;
  private _currentAccount = new BehaviorSubject('');
  private transactionCount = localStorage.getItem('transactionCount');
  currentAccount$ = this._currentAccount.asObservable();
  private isLoading = false;
  test!:String

  private createEthereumContract() {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(provider,signer,transactionsContract);

    return transactionsContract;
  }

  public async checkIfWalletIsConnect() {
    try {
      if (!this.ethereum) return alert('Please install MetaMask.');
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        console.log("Success_1")
        this._currentAccount.next(accounts[0]);
        // await this.getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  public checkIfAccountConnect(){
    if(this.test!=null){
      return true;
    }else{
      return false;
    }
  }

  public async connectWallet() : Promise<boolean>{
    try {
      // if (!this.ethereum) return alert('Please install MetaMask.');
      if (!this.ethereum) return false
      console.log("Test_0");
      const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Test_1");
      console.log("Test_2"+accounts);
      this._currentAccount = accounts;
      this.test=accounts.toString();
      console.log("Test_3"+this.test);
      console.log("Test_4"+this._currentAccount);
      // window.location.reload();
      return true;
    } catch (error) {
      console.log(error);
      return false
      // throw new Error('No ethereum object');
    }
  }

  public printOut(){
    console.log(this.test)
  }

  public async sendTransaction(formData1:any): Promise<string> {

    try {
      this.formData=formData1;
      console.log(this.formData);
      const { addressTo, amount, keyword, message } = this.formData;
      console.log("Test_1 [Receiver Address]"+addressTo);
      const transactionsContract = this.createEthereumContract();
      console.log("Test_2");
      let amount2="0.000001";
      const parsedAmount = ethers.utils.parseEther(amount2);
      console.log("Test_3 [Sender Address] "+this.test)
      console.log("Test_4"+this._currentAccount);
      console.log("Test_5"+this.formData.addressTo);
      console.log("Test_6"+addressTo);

      try {
        await this.ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: this.test,
            to:this.formData.addressTo,
            gas: '0x5208', // 30400
            value: parsedAmount._hex, // 2441406250
          }],
        });
        this.stage_1=true;
      } catch (error) {
        console.error(error);
      }

      if(this.stage_1){
        console.log("Test_7");
        const transactionHash = await transactionsContract['addTooBlockchain'](addressTo, parsedAmount, message, keyword);
        console.log("Test_8");
        this.isLoading = true;
        console.log(`Loading - ${transactionHash.hash}`);
        console.log("Test_9");
        await transactionHash.wait();
        console.log("Test_10");
        console.log(`Success - ${transactionHash.hash}`);
        let transactionHashString: string = transactionHash.hash;
        console.log("Test_11");
        this.isLoading = false;
        return transactionHashString;
      }


      // const transactionsCount = await transactionsContract['getTransactionsCount()']();
      //
      // this.transactionCount = transactionsCount.toNumber();
      // window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
    return '';
  }
}
