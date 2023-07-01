/**
* @description       : 
* @author            : Sangamesh Gella - ABSYZ Software Consulting Private Limited
* @group             : 
* @last modified on  : 04-08-2023
* @last modified by  : Sangamesh Gella - ABSYZ Software Consulting Private Limited
* Modifications Log
* Ver   Date         Author                                                        Modification
* 1.0   03-28-2023   Sangamesh Gella - ABSYZ Software Consulting Private Limited   Initial Version
**/
import { LightningElement, track } from 'lwc';
import getResponse from '@salesforce/apex/ChatGPTCreateImageHandler.getResponse';
import IMAGE from '@salesforce/resourceUrl/ChatBot';

export default class ChatCompletion extends LightningElement {
    
    @track searchResults = [];
    searchTerm = '';
    imageUrl = IMAGE;
    showSpace = true ;
    showSpinner = false;
    responseData;
    
    handleKeyDown(event) {
        if(event.key === 'Enter') {
            this.searchTerm = event.target.value;
            this.showSpinner = true
            this.searchResults = [];
            
            getResponse({searchString: this.searchTerm})
            .then(result => {
                this.showSpinner = false
                console.log('searchTerm:'+this.searchTerm);
                let response = result;
                console.log('response:'+JSON.stringify(response));
                if (response.error) {
                    this.responseData = response.error.message;
                } else if (response) {
                    this.responseData = response;
                }
                console.log('ss',this.responseData)
            })
            .catch(error=>{
                this.showSpinner = false
                console.log('error is '+JSON.stringify(error));
            })
            if(this.searchResults.length > 0 ) {
                this.showSpace =false
            }
        }
    }
}
