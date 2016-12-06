function loadData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', false);
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        callback(JSON.parse(xhr.responseText))
    }
}

function radioChange() {
    var mother = document.querySelector('input[name=mothername]').parentElement;
    var father = document.querySelector('input[name=fathername]').parentElement;
    if(this.childNodes[0].value === "Мужчина") {
        father.classList.add('hidden');
        mother.classList.remove('hidden')
    } else if (this.childNodes[0].value === "Женщина"){
        mother.classList.add('hidden');
        father.classList.remove('hidden')
    }
}

function columnBuilder() {
    var a = document.querySelectorAll('form>div');

    for(var i = 0; i < a.length; i++){
        var element = a[i];
        if (this.value === "1"){
            element.classList.add("col-lg-12");
            element.classList.remove("col-lg-6");
            element.classList.remove("col-lg-4")
        } else if(this.value === "2") {
            element.classList.add("col-lg-6");
            element.classList.remove("col-lg-12");
            element.classList.remove("col-lg-4")
        } else if(this.value === "3") {
            element.classList.add("col-lg-4");
            element.classList.remove("col-lg-12");
            element.classList.remove("col-lg-6")
        }
    }
}
function elementBuilder(element) {
    var wrapper = document.createElement("div");
    var body;
    var label = document.createElement("label");
    var textLabel = document.createTextNode(element.name);
    if(element.view === "text"){
        body = document.createElement("input");
        body.type = "text";
        body.id = element.id;
        body.name = element.name;
        body.value = element.value;
        body.classList.add("form-control");
    } else if(element.view === "radio") {
        body = document.createElement("div");
        body.id = "radio-wrapper";
        body.classList.add("radio");
        element.options.forEach(function (option) {
            var wrap = document.createElement("label");
            var radioLabel = document.createTextNode(option);
            var radio = document.createElement("input");
            radio.name = element.name;
            radio.type = "radio";
            radio.value = option;
            wrap.appendChild(radio);
            wrap.appendChild(radioLabel);
            body.appendChild(wrap);
            wrap.classList.add("control-label");
            wrap.addEventListener("change", radioChange)
        });
    }

    body.label = element.label;
    body.placeholder = element.placeholder;
    wrapper.classList.add("wrapper");
    wrapper.classList.add("col-lg-12");
    wrapper.appendChild(label);
    wrapper.appendChild(body);
    label.appendChild(textLabel);
    label.classList.add("control-label");

    return wrapper
}

function formBuilder(data) {
    var form = document.createElement("form");
    data.forEach(function(element) {
        form.appendChild(elementBuilder(element));
    });
    
    document.getElementById("form-builder").appendChild(form);
}

document.getElementById("column-build").addEventListener("change", columnBuilder);

loadData(formBuilder);
