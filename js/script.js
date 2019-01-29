// what to do when page is ready
$( document ).ready( () => {
    // focus on the fist form field
    $( "#name" ).focus();    
    // hide job role input
    $( "#other-title" ).hide();
    // show job role input if 'other' is selected on the Job Role menu
    $( "#title" ).change( event => {
        if ( event.target.value === "other" ) {
            $( "#other-title" ).show();
        } else {
            $( "#other-title" ).hide();
        }
    });
}); 