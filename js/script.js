// global variables
    let totalCost = 0;
// what to do when page is ready
$( document ).ready( () => {
    // focus on the fist form field
    $( "#name" ).focus();    

    // hide job role input
    $( "#other-title" ).hide();

    // show job role input if 'other' is selected on the Job Role menu
    $( "#title" ).change( event => {
        if ( event.target.value === "other" ) {
            $( "#other-title" ).slideDown();
        } else {
            $( "#other-title" ).slideUp();
        }
    });

    // display correct t-shirt color options
    $( "#design" ).change( event => {
        if ( event.target.value !== "Select Theme" ) {
            $( "#color option" ).each( ( index, option ) => {
                const optionText = option.textContent;
                let designText = event.target[event.target.selectedIndex].textContent;
                designText = designText.replace(/Theme - /, "");
                if ( optionText.includes( designText ) ) {
                    $( option ).show();
                } else {
                    $( option ).hide();
                }
            });
        } else {
            $( "#color option" ).each( ( index, option ) => {
                $( option ).show();
            });
        }
    });

    // provide a sum of the cost of selected courses 
    $( ".activities input" ).change( event => {
        totalCost = 0;
        $( ".activities input" ).each( ( index, option ) => {
            if ( $( option ).is(":checked") ) {
                if ( $( option ).attr("name") === "all" ) {
                    totalCost += 200;
                } else {
                    totalCost += 100;
                }
            } 
        });
        if ( $( "span.total-cost" ).length ) {
            $( "span.inner-total-cost" ).slideUp( function() {
                $( "span.inner-total-cost" ).html( totalCost );
                $( "span.total-cost span" ).slideDown();
            });
        } else {
            $( ".activities" ).after( `<span class="total-cost">Total Cost: $<span class="inner-total-cost">${ totalCost }</span> </span>` );
            $( "span.total-cost" ).hide().slideDown();
        }
    });

    // disable courses which have confilicting timetables
    $( ".activities input" ).change( event => {
        const eventTime = event.target.getAttribute("date");
            $( ".activities input" ).each( ( index, option ) => {
                if ( option.getAttribute("date") === eventTime ) {
                    option.disabled = !option.disabled;
                }
            });
            event.target.disabled = false;
    });
}); 