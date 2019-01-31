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
    $( "#design" ).change ( event => {
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
            $( "span.total-cost" ).html( `Total Cost: $${ totalCost }` ).hide();
            $( "span.total-cost" ).slideDown();
        } else {
            $( ".activities" ).after( `<span class="total-cost">Total Cost: $${ totalCost } </span>` );
            $( "span.total-cost" ).hide().slideDown();
        }

        // if ( totalCost === 0 ) {
        //     $( "span.total-cost" ).slideUp();
        // }
    });
    // disable courses which have confilicting timetables
    $( ".activities input" ).change( event => {
        const eventTime = event.target.getAttribute("date");
        // $( ".activities input" ).each();
    });
}); 