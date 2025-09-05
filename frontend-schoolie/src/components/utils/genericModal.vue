<template>
	<section v-show="visible">
		<div
			id="genericModal"
			:class="customClass"
			:style="{ zIndex: zIndex, opacity: opacity }">
			<!-- Close Button -->
			<span class="isAbsolute hover close-btn mb-2">
				<i
					class="fa fa-window-close"
					aria-hidden="true"></i>
			</span>

			<!-- Optional instruction text -->
			<p
				v-if="inputHint"
				:class="inputHintColor">
				{{ inputHint }}
			</p>

			<!-- Slot for modal content -->
			<div>
				<slot />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	interface ModalPropsInterface {
		visible?: boolean;
		inputHint?: string;
		inputHintColor?: string;
		zIndex?: number;
		customClass?: string | string[];
		opacity?: number;
	}

	withDefaults(defineProps<ModalPropsInterface>(), {
		visible: false,
		inputHintColor: "red-text text-darken-3",
		customClass: "pt-2 px-4 text-center pb-2 grey lighten-2",
		zIndex: 1000,
		opacity: 0.8,
	});
</script>

<style scoped>
	#genericModal {
		display: block;
		position: relative;
	}

	.close-btn {
		position: absolute;
		right: 8px;
		top: 0;
		cursor: pointer;
	}
</style>
