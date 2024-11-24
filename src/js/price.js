function moneda(e){
    e.value = e.value.replace(/[^0-9.]/g, "")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}

function decimal(event, cadena){
    var anterior = event.key;
    var cadena = cadena.value+anterior;
    cadena = cadena.replace(/,/g, "");
    var codigo = event.which;

    if((codigo === 8 || codigo === 46 || codigo === 37 || codigo === 39)){
        return true;
    }
    else if((codigo >= 48 && codigo <= 57) || codigo === 190){
        var expresion = /^([0-9]+ \.?[0-9]{0,2})$/;
        return (expresion.test(cadena) === true);
    }else{
        return false;
    }
}