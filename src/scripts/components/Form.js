const $inputsQuantity = document.querySelectorAll('.input-quantity')

$inputsQuantity.forEach($inputQuantity => {
	const $input = $inputQuantity.querySelector('input')
	$buttonUp = $inputQuantity.querySelector('.do-step-up')
	$buttonDown = $inputQuantity.querySelector('.do-step-down')

	$buttonUp.addEventListener('click', e => {
		$input.stepUp()
	})

	$buttonDown.addEventListener('click', e => {
		$input.stepDown()
	})
})
