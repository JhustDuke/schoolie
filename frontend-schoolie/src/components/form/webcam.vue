<template>
	<div class="text-center">
		<div
			class="border rounded-3 border-4 isRelative text-center mx-auto"
			style="width: 16em; height: 10em">
			<div
				class="d-none"
				ref="canvasWrapper">
				<canvas ref="canvas"></canvas>
				<video
					ref="video"
					class="h-100 w-100 isAbsolute"
					style="object-fit: cover; top: 0; left: 0"></video>
			</div>

			<span class="red-text">{{ helpText }}</span>
			<img
				ref="generatedImg"
				class="d-none w-100 h-100 isAbsolute"
				:alt="altText"
				style="object-fit: cover; top: 0; left: 0" />
		</div>

		<div class="my-2">
			<button
				class="btn btn-primary m-2"
				@click="stopCamera"
				>Stop</button
			>
			<button
				class="btn btn-primary"
				@click="startCamera"
				>Start Camera</button
			>
			<button
				class="btn btn-primary m-2"
				@click="snapPhoto"
				>Snap</button
			>
		</div>

		<input
			class="btn btn-primary w-25"
			type="file"
			accept="image/png, image/jpeg"
			@change="uploadFile" />
	</div>
</template>

<script setup lang="ts">
	defineProps({
		helpText: { type: String, default: "Press start or upload an image." },
		altText: { type: String, default: "webcam image" },
	});

	const emit = defineEmits<{
		(e: "start"): void;
		(e: "stop"): void;
		(e: "snap"): void;
		(e: "upload", file: Event): void;
	}>();

	function startCamera() {
		emit("start");
	}
	function stopCamera() {
		emit("stop");
	}
	function snapPhoto() {
		emit("snap");
	}
	function uploadFile(event: Event) {
		emit("upload", event);
	}
</script>
