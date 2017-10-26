(function(){
    'use strict';
    var vm=this;
    var btnAddInput;
    var btnItemInput;
    var inputItems=[];

    var Events=function(){
        var btnAddInputEvent=function(){
            console.log("Add Input Evenet fired");
        }

        var btnItemInputEvent=function(){
            console.log("Item Input event fired");
        }
        return {
            'btnAddInputEvent':btnAddInputEvent,
            'btnItemInputEvent':btnItemInputEvent
        };
    }

    vm.domBinder=function(){
        btnAddInput=vm.getElementById('btnAddInput');
        btnItemInput=vm.getElementById('btnItemInput');
    }

    vm.addEventListener=function(events){
        btnAddInput.addEventListener('click',events.btnAddInputEvent);
        btnItemInput.addEventListener('click',events.btnItemInputEvent);
    }

    function init(){
        vm.domBinder();
        vm.addEventListener(new Events());
    }
    init();
}
).call(document);