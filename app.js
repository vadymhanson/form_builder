function ajax() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'data.json', false);

    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        formBuilder(JSON.parse(xhr.responseText))
    }
}

function radioChange() {
    if(this.value === "Мужчина") {
        document.querySelector('input[name=fathername]').parentElement.classList.add('hidden');
        document.querySelector('input[name=mothername]').parentElement.classList.remove('hidden')
    } else if (this.value === "Женщина"){
        document.querySelector('input[name=mothername]').parentElement.classList.add('hidden');
        document.querySelector('input[name=fathername]').parentElement.classList.remove('hidden')
    }
}

function columnBuilder() {

    var a = document.querySelectorAll('form>div');

    for(i = 0; i < a.length; i++){
        var element = a[i];
        if (this.value === "1"){
            element.classList.add("col-lg-12")
        } else if(this.value === "2") {
            element.classList.add("col-lg-6")
        } else if(this.value === "3") {
            element.classList.add("col-lg-4")
        }
    }
}

function formBuilder(data) {
    var form = document.createElement("form");
    data.forEach(function(element) {
        if(element.view === "text") {
            var wrapper = document.createElement("div");
            var text = document.createElement("input");
            var label = document.createElement("label");
            var textLabel = document.createTextNode(element.name);
            text.type = "text";
            text.id = element.id;
            text.label = element.label;
            text.name = element.name;
            text.placeholder = element.placeholder;
            text.value = element.value;
            text.classList.add("form-control");
            label.classList.add("control-label");
            wrapper.classList.add("wrapper");
            label.appendChild(textLabel);
            wrapper.appendChild(label);
            wrapper.appendChild(text);
            form.appendChild(wrapper)
        } if(element.view === "radio") {
            var wrapper = document.createElement("div");
            element.options.forEach(function (option) {
                var radio = document.createElement("input");
                var label = document.createElement("label");
                var textLabel = document.createTextNode(option);
                radio.type = "radio";
                radio.id = element.id;
                radio.name = element.name;
                radio.placeholder = element.placeholder;
                radio.value = option;
                label.classList.add("control-label");
                label.appendChild(radio);
                label.appendChild(textLabel);
                wrapper.appendChild(label);
                radio.addEventListener("change", radioChange)
            });
            wrapper.classList.add("wrapper");
            form.appendChild(wrapper);

        }
    });
    document.getElementById("form-builder").appendChild(form);
}

document.getElementById("column-build").addEventListener("change", columnBuilder);

ajax();
