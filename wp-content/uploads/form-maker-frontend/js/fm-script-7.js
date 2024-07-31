    var fm_currentDate = new Date();
    var FormCurrency_7 = '';
    var FormPaypalTax_7 = '0';
    var check_submit7 = 0;
    var check_before_submit7 = {};
    var required_fields7 = [];
    var labels_and_ids7 = {"1":"type_name","2":"type_address","9":"type_checkbox","8":"type_submit_reset"};
    var check_regExp_all7 = [];
    var check_paypal_price_min_max7 = [];
    var file_upload_check7 = [];
    var spinner_check7 = [];
    var scrollbox_trigger_point7 = '20';
    var header_image_animation7 = 'none';
    var scrollbox_loading_delay7 = '0';
    var scrollbox_auto_hide7 = '1';
         function before_load7() {	
}	
 function before_submit7() {
	 }	
 function before_reset7() {	
}
    function onload_js7() {
    }
    function condition_js7() {
    }
    function check_js7(id, form_id) {
    if (id != 0) {
    x = jQuery("#" + form_id + "form_view"+id);
    }
    else {
    x = jQuery("#form"+form_id);
    }    }
    function onsubmit_js7() {
    
  jQuery("<input type=\"hidden\" name=\"wdform_9_allow_other7\" value=\"no\" />").appendTo("#form7");
  jQuery("<input type=\"hidden\" name=\"wdform_9_allow_other_num7\" value=\"0\" />").appendTo("#form7");
  var disabled_fields = "";
  jQuery("#form7 div[wdid]").each(function() {
    if(jQuery(this).css("display") == "none") {
      disabled_fields += jQuery(this).attr("wdid");
      disabled_fields += ",";
    }
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields7\" value =\""+disabled_fields+"\" />").appendTo("#form7");
    }
  });    }
    jQuery(window).load(function () {
    formOnload(7);
    });
    form_view_count7 = 0;
    jQuery(document).ready(function () {
    fm_document_ready(7);
    });
    