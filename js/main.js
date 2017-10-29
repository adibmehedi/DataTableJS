(function(){
    'use strict';

    var vm=this;
    var btnAddInput;
    var btnRemoveInput;
    var btnItemInput;
    var inputItems=[];
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

        //Add Input Feild
        var addInputfeild=function(){
            enableButton(btnRemoveInput);
            var item_input_group=vm.getElementById('item-input-group');
            var inputField=createInput('form-control inputFieldItem',item_input_group,'inputItems','');
        }

        //Remove INput Feild
        var removeInputfeild=function(){
           // var item_input_group=vm.getElementById('item-input-group');
            var input=document.getElementsByClassName('inputFieldItem');
            console.log("Number of Input:",input.length);
            if(input.length>1){
                input[input.length-1].parentNode.removeChild(input[input.length-1]);    
            }
            if(input.length<2){
                disableButton(btnRemoveInput);
            }
        }
        return{
            'addInputfeild':addInputfeild,
            'removeInputfeild':removeInputfeild
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
            wite('inputFeildCounter',++counter);
        }

        return{
            'initializeInputFeildCounter':initializeInputFeildCounter,
            'getInputFeildCountValue':getInputFeildCountValue,
            'incrementInputFeildCounter':incrementInputFeildCounter
        }

    }

    var Events=function(){
       
        var btnAddInputEvent=function(){
            render.addInputfeild();
            console.log("Add Input Evenet fired");
        }

        var btnRemoveInputEvent=function(){
            render.removeInputfeild();
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

        vm.domBinder();
        vm.attachEventListener();
    }

    init();
}
).call(document);