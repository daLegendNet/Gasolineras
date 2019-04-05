toastr.options = {
    "preventDuplicates": true
};



jQuery(window).load(function () {

    
    var messages =
        ["Cargando la información...",
            "Procesando la información" ];
    var message = messages[Math.floor(Math.random() * messages.length)];

    $('#mensajeRandom').text(message);

    jQuery('.preloader').fadeOut();

});

$(document).ready(function () {

    CargarJs();

});

function CargarJs() {
    $('[data-toggle="tooltip"]').tooltip();

    botonSubmit();
    cargarMaterialControls();
    dateTimePickerplugin();

    ModalsDraggable();

    jsTableScroll();
    
    jsAutoComplete();

    //console.clear();
  
}


function jsAutoComplete() {
    try {

        $("#DocumentoDeEvaluacion_Documento_Documento").autocomplete({
            source: function (request, response) {
                $("#DocumentoDeEvaluacion_Documento_DocumentoPuntoVerificacionId").val('');
                $.ajax({
                    url: "/JsonResultAPI/GetDocumento",
                    datatype: "json",
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        response($.map(data, function (val, item) {

                            return { label: val.Documento, value: val.Documento, id: val.DocumentoPuntoVerificacionId }
                        }));
                    }
                });
            },
            select: function (event, ui) {
                $("#DocumentoDeEvaluacion_Documento_DocumentoPuntoVerificacionId").val(ui.item.id);
            }
        });
    } catch  { console.log('no se cargó el autocomplete');}
}


function jsTableScroll() {
    $(".table-scroll").each(function (index, element) {

        if ($(this).children().length <= 1) {
            $(this).prepend($("<div><input class='form-control inputBusqueda' placeholder='Ingresa el contenido que estás buscando' /></div>"));
        }
    });
    

    $('.inputBusqueda').on('keyup', function () {
        // Declare variables

        var input, filter, table, tr, td, i;
        input = $(this);
        filter = input.val().toUpperCase();

        var padre = $(this).parent().parent().children();
        //console.log(padre);

        table = padre;
        tr = table.children().children();

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerText.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    });
}


function ModalsDraggable() {
    try {

        $(".modal-dialog").draggable({
            handle: ".modal-header"
        });
    }
    catch{ console.log('sin cargr draggable'); }
}
function dateTimePickerplugin() {
    $('.date').datetimepicker({
        locale: 'es',
        showClose: true,
        format: 'DD/MM/YYYY HH:mm:ss',
        showTodayButton: true,
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });

}

function cargarMaterialControls() {
    
    (function ($) {
        'use strict';

        // INPUT CLASS DEFINITION
        // ======================

        var Input = function (element) {
            this.$element = $(element);
            this.$wrapper = null;

            // Initialize input
            this.init();
        };

        Input.VERSION = '1.0.0';

        Input.prototype.checkValue = function () {
            var hasValue = (this.$element.val() || '').length;
            this.$wrapper.toggleClass('has-value', !!hasValue);
        };

        Input.prototype.checkDisabled = function () {
            var isDisabled = this.$element.is(':disabled');
            this.$wrapper.toggleClass('is-disabled', !!isDisabled);
        };

        Input.prototype.updateCssClasses = function () {
            this.checkValue();
            this.checkDisabled();
        };

        Input.prototype._handleInputFocus = function () {
            this.$wrapper.addClass('is-focused');
        };

        Input.prototype._handleInputBlur = function () {
            this.$wrapper.removeClass('is-focused');
        };

        Input.prototype.init = function () {
            this.$wrapper = this.$element.closest('.md-form-group');

            this.$element.on('change.bs.input', $.proxy(this.updateCssClasses, this))
                .on('focus.bs.input', $.proxy(this._handleInputFocus, this))
                .on('blur.bs.input', $.proxy(this._handleInputBlur, this));

            this.updateCssClasses();
        };

        // INPUT PLUGIN DEFINITION
        // ========================

        function Plugin(option) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('bs.input');

                if (!data) $this.data('bs.input', (data = new Input(this)));
                if (typeof option == 'string') data[option]();
            });
        }

        var old = $.fn.input;

        $.fn.input = Plugin;
        $.fn.input.Constructor = Input;


        // INPUT NO CONFLICT
        // ==================

        $.fn.input.noConflict = function () {
            $.fn.input = old;
            return this;
        };


        // INPUT DATA-API
        // ===============

        $('.md-form-control').each(function () {
            Plugin.call($(this));
        });

    })(jQuery);
}



function convertToSlug(Text) {

    Text = Text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return Text
        //.toLowerCase()
        .replace(/[^\w ]+/g, '-')
        .replace(/ +/g, '-')
        ;
}



function botonSubmit() {
    $('input[type="submit"],button[type="submit"]').removeAttr('disabled');

    $('button[type="submit"]').on('click', function () {
        $(this).prepend('<i class="spinner spinner-default pos-r sq-32 "></i><br />').attr('disabled', 'disabled');
    });

}