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
    $( "#design option[value='select theme']").attr('disabled', true);
    $( "#design" ).change( event => {
        if ( event.target.value !== "Select Theme" ) {
            $( "#color option" ).each( ( index, option ) => {
                $( option ).attr('selected', false);
                const optionText = option.textContent;
                let designText = event.target[event.target.selectedIndex].textContent;
                designText = designText.replace(/Theme - /, "");
                if ( optionText.includes( designText ) ) {
                    $( option ).show();
                } else {
                    $( option ).hide();
                }
            });
            $( "#color option" ).each( ( index, option ) => {
                if ( option.style.display !== 'none' ) {
                    $( option ).attr('selected', true);
                    return false;
                }
            });
        } else {
            $( "#color option" ).each( ( index, option ) => {
                $( option ).show();
            });
        }
    });

    // provide a sum of the cost of selected courses 
    let totalCost = 0;
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
            $( ".activities" ).after(`<span class="total-cost">Total Cost: $<span class="inner-total-cost">${ totalCost }</span> </span>`);
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

    // disable the "Select Payment Method Option"
    $( "#payment option[value='select_method']" ).attr('disabled', true);

    // set credit card as default payment option, display the correct information based on the selected payment method
    $( "#payment option[value='credit-card']" ).attr('selected', true);
    $( "#payment-info .paypal" ).css('display', "none");
    $( "#payment-info .bitcoin" ).css('display', "none");
    $( "#payment" ).change( event => {
        const paymentValue = event.target.value;
        $( "#payment option" ).each( (index, option) =>{
            if ( paymentValue === option.value ) {
                $( option ).attr('selected', true);
            } else {
                $( option ).attr('selected', false);
            }
        });
        $( "#payment-info").children('div').each( (index, option) => {
            const paymentDivClass = $( option ).attr('class');
            if ( paymentValue === paymentDivClass ) {
                $( option ).slideDown();
            } else {
                $( option ).slideUp();
            }
        });
    });  
    
    // form validation

        // variables
        const nameInput = document.querySelector("#name");
        const emailInput = document.querySelector("#mail");

        // input field validator functions
        const nameValidator = name => /^[A-Z][a-z]{1,14}$/.test(name);
        const emailValidator = email => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);

        // function that creates an event listener
        const createListener = validator => {
            return event => {
                const tooltip = event.target.nextElementSibling;
                const inputValue = event.target.value;
                const isValid = validator(inputValue);
                const showTooltipBoolean = inputValue !== "" && !isValid;
                showTooltip(showTooltipBoolean, tooltip);
                console.log(isValid);
                console.log(inputValue);
            }
        };

        // tooltip function that dispalys or hides the tooltip
        const showTooltip = (showTooltipBoolean, tooltip) => {
            if (showTooltipBoolean) {
                tooltip.style.display = "inherit";
            } else {
                tooltip.style.display = "none";
            }
        };

        // event listeners
        nameInput.addEventListener("input", createListener(nameValidator));
        emailInput.addEventListener("input", createListener(emailValidator));

}); 