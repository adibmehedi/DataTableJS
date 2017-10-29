(function(){
    'use strict';

    var vm=this;
    var btnAddInput;
    var btnRemoveInput;
    var btnItemInput;
    var inputItems=[];
    var isEditMode=false;
    var render;
    var events;
    var storage;
   

    vm.RenderFunctions=function(){

        var createElement = function (tagName, className = null, parentTag = null, id = null, value = null) {
            var elem = document.createElement(tagName);
            elem.className = className;
            elem.value = value;
            elem.id = id;
            parentTag.appendChild(elem);
            return elem;
        }

        var createButton = function (className, parentTag, id, btnText,value=null) {
            var elem = createElement('button', className, parentTag, id, value);
            elem.innerText = btnText;
            return elem;
        }

        var createInput = function (className, parentTag, id, placeholder=null) {
            var elem = createElement('input', className, parentTag, id);
            elem.type = "text";
            elem.placeholder = placeholder;
            return elem;
        }

        var disableButton=function(buttonElem){
            buttonElem.disabled=true;
        }

        var enableButton=function(buttonElem){
            buttonElem.disabled=false;
        }

        var addInputfeild=function(inputcounter){
            var item_input_group=vm.getElementById('item-input-group');
            var inputField=createInput('form-control inputFieldItem',item_input_group,'inputItems','');
        }

        var removeAllInputfeild=function(){
            var item_input_group=vm.getElementById('item-input-group');
            item_input_group.innerHTML="";
         } 
         
        var renderInputButtons=function(){
            var item_input_group=vm.getElementById('item-input-group');
            var elem=createButton('btn btn-primary btn-block',item_input_group,'btnItemInput','Add Item');
        }

        var renderInputFeilds=function(){
            removeAllInputfeild();
            var inputFeildCounter=storage.getInputFeildCountValue();
            for(var i=0;i<inputFeildCounter;i++){
                addInputfeild(i);
            }
            renderInputButtons();
        }



        var buttonDisableEnable=function(){
            if(storage.getInputFeildCountValue()<2){
                disableButton(btnRemoveInput);
                console.log("Butotn Should be disabled");
            }else{
                enableButton(btnRemoveInput);
                console.log("Butotn Should be Enable");
            }

            if(isEditMode){
                disableButton(btnAddInput);
                disableButton(btnRemoveInput);
            }
        }
        
        return{
            'renderInputFeilds':renderInputFeilds,
            'buttonDisableEnable':buttonDisableEnable
        }
    }

    var StorageFuncitons=function(){

        var readFromStorage=function(key){
            var data=localStorage.getItem(key);
            if(data!=null)
                return data;
            else 
                return null;
        }

        var writeToStorage=function(key,data){
            localStorage.setItem(key,data);
        }

        var initializeInputFeildCounter=function(){
            writeToStorage('inputFeildCounter','1');
        }   

        var getInputFeildCountValue=function(){
            return readFromStorage('inputFeildCounter');
        }

        var incrementInputFeildCounter=function(){
            var counter=getInputFeildCountValue();
            writeToStorage('inputFeildCounter',++counter);
        }

        var decrementInputFeildCounter=function(){
            var counter=getInputFeildCountValue();
            writeToStorage('inputFeildCounter',--counter);
        }

        return{
            'initializeInputFeildCounter':initializeInputFeildCounter,
            'getInputFeildCountValue':getInputFeildCountValue,
            'incrementInputFeildCounter':incrementInputFeildCounter,
            'decrementInputFeildCounter':decrementInputFeildCounter
        }

    }

    var Events=function(){
       
        var btnAddInputEvent=function(){
            storage.incrementInputFeildCounter();
            render.renderInputFeilds();
            render.buttonDisableEnable();
            console.log("Add Input Evenet fired");
        }

        var btnRemoveInputEvent=function(){
            storage.decrementInputFeildCounter();
            render.renderInputFeilds();
            render.buttonDisableEnable();
            console.log("Remove Input Evenet fired");
        }

        var btnItemInputEvent=function(){
            console.log("Item Input event fired");
        }
        return {
            'btnAddInputEvent':btnAddInputEvent,
            'btnRemoveInputEvent':btnRemoveInputEvent,
            'btnItemInputEvent':btnItemInputEvent
        };
    }

    vm.domBinder=function(){
        btnAddInput=vm.getElementById('btnAddInput');
        btnRemoveInput=vm.getElementById('btnRemoveInput');
        btnItemInput=vm.getElementById('btnItemInput');
    }

    vm.attachEventListener=function(){
        btnAddInput.addEventListener('click', events.btnAddInputEvent);
        btnRemoveInput.addEventListener('click', events.btnRemoveInputEvent);
       // btnItemInput.addEventListener('click',events.btnItemInputEvent);
    }

    function init(){
        render=new vm.RenderFunctions();
        events=new Events();
        storage=new StorageFuncitons();

        //Initializing StorageData
        if(storage.getInputFeildCountValue()==null){
            storage.initializeInputFeildCounter();
            console.log("storage Initialized");
        }
      
        //Render Dynamic Displayts
        render.renderInputFeilds();
        vm.domBinder();
     
        vm.attachEventListener();
    }

    init();
}
).call(document);