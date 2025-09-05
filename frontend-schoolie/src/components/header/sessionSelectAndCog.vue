<template>
	<!-- Flex container to align select and cog horizontally -->
	<div class="d-flex align-items-center gap-3">
		<!-- Rounded select dropdown with auto width -->
		<select
			class="form-select"
			style="border-radius: 20px; width: auto">
			<option
				selected
				disabled
				value="chooseSession"
				>Choose session</option
			>
			<option value="addSession">Add Session</option>
		</select>

		<!-- Generic modal directly underneath the select position absolute to navbar -->
		<div
			class="mt-2 w-50 isAbsolute"
			style="top: 96%; left: 20%">
			<GenericModal>
				<div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
					libero corrupti, ducimus, harum sit esse odit tempore quod sequi ad
					ipsam quam, ipsa repudiandae aperiam alias voluptatibus maxime
					quibusdam minima?
				</div>
			</GenericModal>
		</div>

		<!-- Cog icon styled as clickable -->
		<i
			class="fa fa-cog white-text fs-5"
			style="cursor: pointer"></i>
	</div>
</template>

<script setup lang="ts">
	import GenericModal from "../utils/genericModal.vue";

	//const show: boolean = true;
</script>
