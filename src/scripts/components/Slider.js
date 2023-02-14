import Swiper, { Navigation, Pagination, EffectFade } from 'swiper'

Swiper.use([Navigation, Pagination, EffectFade])

class Slider {
	constructor($slider) {
		let slider = this.constructor.makeSlider($slider)
		return slider
	}

	static makeSlider($slider) {
		this.$slider = $slider
		this.$container = $slider.querySelector(':scope > .swiper-container')
		this.$pagination = $slider.querySelector(':scope > .slider__pagination')

		this.$buttonPrev =
			this.$slider.querySelector(':scope .slider__nav.-prev') ||
			this.$container.querySelector(':scope .slider__nav.-prev')

		this.$buttonNext =
			this.$slider.querySelector(':scope > .slider__nav.-next') ||
			this.$container.querySelector(':scope > .slider__nav.-next')

		function getSlidesCount(dataSlides) {
			if (dataSlides === 'auto') return dataSlides

			let dataSlidesNum = parseInt(dataSlides)

			if (dataSlidesNum !== NaN) {
				return dataSlidesNum
			}

			return undefined
		}

		let slidesPerView = getSlidesCount($slider.dataset.slides)
		let slidesPerViewXl = getSlidesCount($slider.dataset.slidesXl)
		let slidesPerViewLg = getSlidesCount($slider.dataset.slidesLg)
		let slidesPerViewMd = getSlidesCount($slider.dataset.slidesMd)
		let slidesPerViewSm = getSlidesCount($slider.dataset.slidesSm)
		let slidesPerViewXs = getSlidesCount($slider.dataset.slidesXs)

		let allowTouchMove = $slider.dataset.touchMove !== undefined ? parseInt($slider.dataset.touchMove) : true
		let nested = $slider.dataset.nested !== undefined ? parseInt($slider.dataset.nested) : false
		let bulletsHover = $slider.dataset.bulletsHover !== undefined ? parseInt($slider.dataset.bulletsHover) : false
		let spaceBetween = parseInt($slider.dataset.gap) || 0

		function initBulletsHover(swiper) {
			let $bullets = swiper.pagination.bullets

			$bullets.forEach($bullet => {
				$bullet.addEventListener('mouseover', e => {
					$bullet.click()
				})
			})
		}

		let options = {
			direction: 'horizontal',
			speed: parseInt($slider.dataset.speed) || 300,
			loop: $slider.dataset.loop || false,
			slidesPerGroup: 1,
			slidesPerView: slidesPerView || slidesPerViewXl || slidesPerViewLg || slidesPerViewMd || slidesPerViewSm || slidesPerViewXs || 1,
			// slidesPerView: 'auto',
			freeMode: $slider.dataset.freeMode || false,
			// freeMode: true,
			spaceBetween: spaceBetween,
			centeredSlides: $slider.dataset.centered || false,
			centerInsufficientSlides: $slider.dataset.centerInsufficient || false,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			allowTouchMove: allowTouchMove,
			autoHeight: $slider.dataset.autoHeight || false,
			nested: nested,
			touchMoveStopPropagation: true,
			touchStartForcePreventDefault: true,
			on: {
				init: () => {},
				paginationRender(swiper) {
					if (bulletsHover) {
						initBulletsHover(swiper)
					}
				},
			},
			pagination: {
				el: this.$pagination,
				clickable: true,
			},
			navigation: {
				prevEl: this.$buttonPrev,
				nextEl: this.$buttonNext,
			},
			breakpoints: {
				0: {
					freeMode: true,
					slidesPerView: slidesPerViewXs || slidesPerViewSm || slidesPerViewMd || slidesPerViewLg || slidesPerViewXl || slidesPerView || 1
				},
				576: {
					slidesPerView: slidesPerViewSm || slidesPerViewMd || slidesPerViewLg || slidesPerViewXl || slidesPerView || 1
				},
				768: {
					slidesPerView: slidesPerViewMd || slidesPerViewLg || slidesPerViewXl || slidesPerView || 1
				},
				992: {
					slidesPerView: slidesPerViewLg || slidesPerViewXl || slidesPerView || 1
				},
				1200: {
					slidesPerView: slidesPerViewXl || slidesPerView || 1
				},
				1600: {
					slidesPerView: slidesPerView || 1
				}
			}
		}

		if ($slider.dataset.effect === 'fade') {
			options = {
				...options,
				...{
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					}
				}
			}
		}

		return new Swiper(this.$container, options)
	}

	static makeSliders($sliders) {
		const instances = []
		$sliders.forEach(($slider) => {
			instances.push(this.makeSlider($slider))
		})
		return instances
	}

}

export default Slider
