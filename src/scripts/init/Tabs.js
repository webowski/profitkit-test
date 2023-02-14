import Tabs from '../components/Tabs'

const $tabsSet = document.querySelectorAll('.tabs')

$tabsSet.forEach(($tabs) => {
	new Tabs($tabs)
})
