
<!DOCTYPE html>
<html>
<head>
	<meta charset=utf-8 />
	<title>JS Guitar Scales</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<script type="text/javascript" src="js/utils.js"></script>
	<script type="text/javascript" src="js/notes.js"></script>
	<script type="text/javascript" src="js/scaletypes.js"></script>
	<script type="text/javascript" src="js/tuningPresets.js"></script>
	<script type="text/javascript" src="js/collapser.js"></script>
	<script type="text/javascript" src="js/jsGuitarScales.js"></script>
<body>

	<header>
		<h1>JS Guitar Scales</h1>
	</header>

	<main>

		<section>

			<div class="collapser js-collapser" data-name="stringSetup" data-collapsed="false">
				<div class="collapserHead js-collapserHead">
					<h2 class="js-collapserTgl">String setup</h2>
					<span class="collapserArrow js-collapserArrow js-collapserTgl"></span>
				</div>
				<div class="noCollapse">
					<div class="js-tuningPresets"></div>
				</div>
				<div class="collapserBody js-collapserBody">
					<div class="stringSetup wrap js-stringSetup">
						<div class="tunerWrap js-tunerWrap"></div>
						<div class="btnWrap clear">
							<button class="addStringBtn js-addStringBtn" type="button">+ String</button>
						</div>
					</div>
				</div>
			</div>

			<div class="scaleSetup clear">
				<div class="rootNote">
					<label for="rootNote"><span>Root note</span>&nbsp;<select class="js-rootNote" name="rootNote"></select></label>
				</div>
				<div class="scaleType">
					<label for="scaleType"><span>Scale</span>&nbsp;<select class="js-scaleType" name="scaleType"></select></label>
				</div>

				<div class="renderScale clear">
					<button type="button" class="js-renderScale">Show scale >></button>
				</div>
			</div>

		</section>

		<section>
			<div class="collapser js-collapser" data-name="fretboard" data-collapsed="true">
				<div class="collapserHead js-collapserHead">
					<h2>Fretboard</h2>
					<span class="collapserArrow js-collapserArrow js-collapserTgl"></span>
				</div>
				<div class="collapserBody js-collapserBody">
					<div class="fretboardWrap wrap">
						<div class="scaleNotes js-scaleNotes"></div>
						<div class="fretboard js-fretboard"></div>
						<div class="controls clear">
							<button type="button" class="displayAllBtn js-displayAllBtn">Show All</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="collapser js-collapser" data-name="triads" data-collapsed="true">
				<div class="collapserHead js-collapserHead">
					<h2>Triads</h2>
					<span class="collapserArrow js-collapserArrow js-collapserTgl"></span>
				</div>
				<div class="collapserBody js-collapserBody">
					<div class="triadsWrap wrap">
						<div class="triadsList js-triadsList"></div>
					</div>
				</div>
			</div>
		</section>

	</main>

</body>
</html>