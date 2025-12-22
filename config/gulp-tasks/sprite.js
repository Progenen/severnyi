import svgSprite from "gulp-svg-sprite";
import cheerio from "gulp-cheerio";

export const sprite = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../img/icons/icons.svg',
				}
			},
			shape: {
				id: {
					separator: '',
					generator: ''
				},
				transform: [
					{
						/*svgo: {
							plugins: [
								{ removeXMLNS: true },
								{ convertPathData: false },
								{ removeViewBox: false },
							]
						}*/
					}
				]
			},
			svg: {
				rootAttributes: {
					style: 'display: none;',
					'aria-hidden': true
				},
				xmlDeclaration: false
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				// fill
				$('[fill]').each(function () {
					const value = $(this).attr('fill');
					if (!value) return;

					if (value.toLowerCase() === 'none') {
						// оставляем none
						$(this).attr('fill', 'none');
					} else {
						// любые цвета превращаем в currentColor
						$(this).attr('fill', 'currentColor');
					}
				});

				// stroke
				$('[stroke]').each(function () {
					const value = $(this).attr('stroke');
					if (!value) return;

					if (value.toLowerCase() === 'none') {
						$(this).attr('stroke', 'none');
					} else {
						$(this).attr('stroke', 'currentColor');
					}
				});

				// инлайн-стили: приводим fill/stroke в style к currentColor / none
				$('[style]').each(function () {
					let style = $(this).attr('style');
					if (!style) return;

					// fill: ...
					style = style.replace(/fill\s*:\s*([^;]+)/gi, (match, value) => {
						const v = String(value).trim().toLowerCase();
						return v === 'none' ? 'fill:none' : 'fill:currentColor';
					});

					// stroke: ...
					style = style.replace(/stroke\s*:\s*([^;]+)/gi, (match, value) => {
						const v = String(value).trim().toLowerCase();
						return v === 'none' ? 'stroke:none' : 'stroke:currentColor';
					});

					// если после правки style пустой — убираем атрибут
					if (style.trim() === '') {
						$(this).removeAttr('style');
					} else {
						$(this).attr('style', style);
					}
				});
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(app.gulp.dest(`${app.path.srcFolder}`));
};
