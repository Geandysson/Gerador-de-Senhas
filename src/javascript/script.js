function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const ChartTypes = [];

    if(uppercase) {
        ChartTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if(lowercase) {
        ChartTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    if(number) {
        ChartTypes.push('0123456789');
    }
    
    if(specialCharacter) {
        ChartTypes.push('!@#$%¨&*()_-+=|,<.>;:/?~^]}[{');
    }
    return ChartTypes;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 128) {
       message('Tamanho inválido, digite um número entre 4 e 128!', 'danger' );
    }

    return size;
}

function randomCharType(chartTypes) {
    const randomIndex = Math.floor(Math.random() * chartTypes.length);
    
    return chartTypes[randomIndex][Math.floor(Math.random() * chartTypes[randomIndex].length)];
}

function generatePassword(size, chartTypes) {
    let passwordGenerate = '';

    while (passwordGenerate.length < size) {
        passwordGenerate += randomCharType(chartTypes)
    }

    return passwordGenerate;
}

function message(text, status = 'success'){
      Toastify({
            text: text,
            duration: 2000,
            style: {
                background: status === 'success' ? '#84cc16' : '#dc2626',
                boxShadow: 'none'
            }
        }).showToast();
}

document.querySelector('#generate').addEventListener('click', function(){
    const size = getPasswordSize();
    const chartTypes= getChartTypes();

    if (!size) {
        return;
    }
    if (!chartTypes.length){
        message('Selecione pelo menos um tipo de caractere!', 'danger')
        return;
    }

    const passwordGenerate = generatePassword(size, chartTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent= passwordGenerate;
});

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', 'success');
});