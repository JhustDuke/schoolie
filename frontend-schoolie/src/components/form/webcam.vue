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

			<span
				class="red-text"
				ref="cameraHelp"
				>{{ helpText }}</span
			>
			<img
				ref="generatedImg"
				class="d-none w-100 h-100 isAbsolute"
				:alt="altText"
				style="object-fit: cover; top: 0; left: 0" />
		</div>

		<div class="my-2">
			<button
				disabled
				ref="stopCamBtn"
				type="button"
				class="btn btn-primary m-2"
				@click="stopCamera"
				>Stop</button
			>
			<button
				ref="startCamBtn"
				type="button"
				class="btn btn-primary"
				@click="startCamera"
				>Start Camera</button
			>
			<button
				disabled
				ref="snapCamBtn"
				type="button"
				class="btn btn-primary m-2"
				@click="snapAndStopCam"
				>Snap</button
			>
		</div>

		<input
			ref="uploadCamBtn"
			class="btn btn-primary w-25"
			type="file"
			accept="image/png, image/jpeg"
			@change="uploadFile" />
	</div>
</template>

<script setup lang="ts">
	import { ref, defineExpose } from "vue";
	defineProps({
		helpText: { type: String, default: "Press start or upload an image." },
		altText: { type: String, default: "webcam image" },
	});

	const emit = defineEmits<{
		(e: "imageCaptured", payload: { success: boolean; image?: any }): void;
		(e: "upload", payload: { success: boolean; file?: any }): void;
	}>();

	const video = ref<HTMLVideoElement | null>(null);

	const startCamBtn = ref<HTMLButtonElement | null>(null);
	const stopCamBtn = ref<HTMLButtonElement | null>(null);
	const snapCamBtn = ref<HTMLButtonElement | null>(null);

	const canvas = ref<HTMLCanvasElement | null>(null);
	const canvasWrapper = ref<HTMLDivElement | null>(null);

	const cameraHelp = ref<HTMLElement | null>(null);
	const generatedImg = ref<HTMLImageElement | null>(null);

	let stream: MediaStream | null = null;

	async function startCamera() {
		try {
			//if the stream is inactive start the webcam
			if (!stream) {
				stream = await navigator.mediaDevices.getUserMedia({ video: true });
				video.value!.srcObject = stream;
				video.value?.play();
				canvasWrapper.value?.classList.remove("d-none");
				cameraHelp.value?.classList.add("d-none");

				generatedImg.value!.src = "";

				startCamBtn.value!.textContent = "retake?";
				startCamBtn.value!.disabled = true;
				stopCamBtn.value!.disabled = false;
				snapCamBtn.value!.disabled = false;
				console.log("streaming");
			}
		} catch (err) {
			console.log("there was an error:", err);
		}

		// emit("start");
	}
	function stopCamera() {
		if (stream) {
			stream.getTracks().forEach(function (track: any) {
				track.stop();
			});
			stream = null;
			video.value?.pause();
			stopCamBtn.value!.disabled = true;
			snapCamBtn.value!.disabled = true;
			startCamBtn.value!.disabled = false;
			console.log("stream stopped!");
		}
	}

	function snapPhoto() {
		if (stream && canvas.value && video.value) {
			const ctx = canvas.value.getContext("2d")!;
			canvas.value.width = video.value.videoWidth;
			canvas.value.height = video.value.videoHeight;
			ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

			// Convert to blob instead of base64
			canvas.value.toBlob((blob) => {
				if (!blob) {
					emit("imageCaptured", { success: false });
					return;
				}

				// Convert blob to File so backend can read it like normal upload
				const file = new File([blob], "webcam.png", { type: blob.type });

				// Preview the captured image
				const imageUrl = URL.createObjectURL(file);
				generatedImg.value?.classList.remove("d-none");
				generatedImg.value!.src = imageUrl;
				canvas.value?.classList.add("d-none");

				console.log("snapped picture (blob)");

				// Emit the file to parent
				emit("imageCaptured", { success: true, image: file });
			}, "image/png");
		}
	}

	function snapAndStopCam() {
		snapPhoto();
		stopCamera();
	}
	function uploadFile(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		const file = fileInput.files?.[0];

		if (!file || !file.type.startsWith("image/")) return;

		const reader = new FileReader();
		reader.onload = function (e) {
			if (generatedImg.value && e.target?.result) {
				generatedImg.value!.src = e.target.result as string;

				generatedImg.value!.classList.remove("d-none");
				console.log("image read and stored successfully");
				emit("upload", { success: true, file });
			} else {
				emit("upload", { success: false });

				console.log("image failed to upload try again");
			}
		};
		reader.readAsDataURL(file);
	}

	function resetImageSrc() {
		generatedImg.value!.src = "";
	}
	defineExpose({ reset: resetImageSrc });
</script>
