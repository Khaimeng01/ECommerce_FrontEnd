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
  currentWalletAddress!:String

  private createEthereumContract() {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
  }

  public async checkIfWalletIsConnect() {
    try {
      if (!this.ethereum) return alert('Please install MetaMask.');
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        console.log("Success_1")
        this._currentAccount.next(accounts[0]);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
    }
  }

  public checkIfAccountConnect(){
    if(this.currentWalletAddress!=null){
      return true;
    }else{
      return false;
    }
  }

  public async connectWallet() : Promise<boolean>{
    try {
      if (!this.ethereum) return false
      const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
      this._currentAccount = accounts;
      this.currentWalletAddress=accounts.toString();
      return true;
    } catch (error) {
      return false
    }
  }




  public async sendTransaction(formData:any): Promise<string> {

    try {
      this.formData=formData;
      const { addressTo, amount, keyword, message } = this.formData;
      const transactionsContract = this.createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      let continueLoop = true;
      while (continueLoop) {
        try {
          await this.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
              from: this.currentWalletAddress,
              to: this.formData.addressTo,
              gas: '0x5208',
              value: parsedAmount._hex,
            }],
          });
          this.stage_1 = true;
          continueLoop = false;
        } catch (error) {
          console.error(error);
        }
      }

      let continueLoop2 = true;
      while (continueLoop2) {
        try {
          const transactionHash = await transactionsContract['addTooBlockchain'](addressTo, parsedAmount, message, keyword);
          this.isLoading = true;
          let transactionHashString: string = transactionHash.hash;
          this.isLoading = false;
          return transactionHashString;
        }catch (error){}
      }

    } catch (error) {
      throw new Error('No ethereum object');
    }
    return '';
  }
}
