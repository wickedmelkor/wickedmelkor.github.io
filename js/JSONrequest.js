let obj;

function loadJSON(url, objName){
    
    let request = new XMLHttpRequest();
    request.open('GET',url,true);
    
    request.onreadystatechange = function(){

        let infoP;
        
        if(request.readyState === 4 /*request.status === 200 && request.status < 400*/){
            let data = JSON.parse(request.responseText);
            for(let i = 0; i < data.universidades.length; i++){
              
                if(data.universidades[i].nombre === objName){
                    //console.log(data.universidades[i].nombre);
                    document.getElementById("info1").innerHTML = data.universidades[i].info.desc1;
                    
                    document.getElementById("info2").innerHTML = data.universidades[i].info.desc2;
                    
                    removeAllChilds(document.getElementById("info3"));
                    infoP = document.createElement("p");
                    infoP.innerHTML = data.universidades[i].info.desc3;
                    document.getElementById("info3").appendChild(infoP);
                    
                    infoP = document.createElement("p");
                    infoP.innerHTML = data.universidades[i].info.desc4;
                    document.getElementById("info3").appendChild(infoP);
                    
                    removeAllChilds(document.getElementById("info4"));
                    infoP = document.createElement("p");
                    infoP.innerHTML = data.universidades[i].info.desc5;
                    document.getElementById("info4").appendChild(infoP);
                    
                    break;
                }
            }
            
        }
    };
    request.send();
}

function removeAllChilds(elem){
    while(elem.firstChild){
        elem.removeChild(elem.firstChild);
    }
}