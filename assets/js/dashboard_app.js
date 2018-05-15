$(function () {
	show_bio_data();
	show_resume();
	show_available_jobs();
	count_dashboard();

	function count_dashboard() {
		var html = '';
		var i;
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'count_dashboard',
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.data != null) {
					$('#applications_count').html(response.data.pending_applicant);
				} else {
					$('#applications_count').html(0);
				}
				if (response.data1 != null) {
					$('#jobs_count').html(response.data1.jobs_posted);
				} else {
					$('#jobs_count').html(0);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	}
	var image = 0;
	$('.btn-default').attr('disabled', 'disabled');
	$('#image').click(function () {
		$('.btn-default').removeAttr('disabled');
		setInterval(function () {
			if ($('#image').val().length < 1) {
				$('.btn-default').attr('disabled', 'disabled');
			} else {
				$('.btn-default').removeAttr('disabled');
			}
		}, 0)
	})
	//For Biodata Functions Start HERE!
	var gender;

	function show_bio_data() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_bio',
			async: true,
			dataType: 'json',
			success: function (response) {
				var html = '';
				console.log(response);
				if (response.success) {
					gender = response.data.sex;
					console.log(gender);
					$("#user_fullname").val(response.data.fname + ' ' + response.data.mname + ' ' + response.data.lname);
					$("#user_sex").val(response.data.sex);
					$("#user_birthdate").val(response.data.birthdate);
					$("#user_nationality").val(response.data.nationality);
					$("#user_religion").val(response.data.religion);
					$("#user_home_address").val(response.data.haddress);
					$("#user_current_address").val(response.data.caddress);
					$("#mother_fullname").val(response.data.momfname);
					$("#mother_birthdate").val(response.data.mombday);
					$("#mother_occupation").val(response.data.momwork);
					$("#father_fullname").val(response.data.dadfname);
					$("#father_birthdate").val(response.data.dadbday);
					$("#father_occupation").val(response.data.dadwork);
					if (response.pic) {
						$('#prof_pic').attr('src', '../../ojt/' + response.pic.photo_path);
						$('#prof_pic1').attr('src', '../../ojt/' + response.pic.photo_path);
					} else {

					}
					$('#user_profile_name').html(response.data.fname + ' ' + response.data.mname + ' ' + response.data.lname);

				}

			},
			error: function () {
				alert('Error');
			}
		});
	}

	$('#btnedit_bio').click(function () {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_bio',
			async: true,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {
					$("#bio_fname").val(response.data.fname);
					$("#bio_mname").val(response.data.mname);
					$("#bio_lname").val(response.data.lname);
					$("#bio_nationality").val(response.data.nationality);
					$("#bio_religion").val(response.data.religion);
					$("#bio_h").val(response.data.haddress);
					$("#bio_c").val(response.data.caddress);
					$("#bio_bday").val(response.data.birthdate);
					$("#bio_momfname").val(response.data.momfname);
					$("#bio_mombday").val(response.data.mombday);
					$("#bio_momwork").val(response.data.momwork);
					$("#bio_dadfname").val(response.data.dadfname);
					$("#bio_dadbday").val(response.data.dadbday);
					$("#bio_dadwork").val(response.data.dadwork);
				}
			},
			error: function () {
				alert('Error');
			}
		});
		$('#edit_bio').modal('show');
	})

	$('#form_bio').submit(function () {
		var formData = $('#form_bio').serialize();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'edit_bio',
			data: formData,
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.operation == 'insert') {
					alert('data inserted');
				} else if (response.operation == 'update') {
					alert('data updated');
				}
				window.location.href = 'dashboard';

			},
			error: function () {
				alert('Error');
			}
		});
		return false;
	});
	//For Biodata Functions End HERE!
	//For Resume Functions Start HERE!
	$('#btnsubmit_resume').attr('disabled', 'disabled');
	var form = '<div class="form-group">' +
		'<input id="data_input" style="display:none;" name="data_input" class="form-control">' +

		'<label id="super_input" class="label-control col-md-3" style="padding: 6px 12px;"></label>' +
		'<div class="col-md-8">' +
		'<input id="input" type="text" name="" class="form-control" >' +
		'</div>' +
		'</div>' +

		'<div class="form-group" id="hide_form1">' +
		'<label id="super_input1" class="label-control col-md-3" style="padding: 6px 12px;"></label>' +
		'<div class="col-md-8">' +
		'<input id="input1" name="" class="form-control" >' +
		'</div>' +
		'</div>' +

		'<div class="form-group" id="hide_form2">' +
		'<label id="super_input2" class="label-control col-md-3" style="padding: 6px 12px;"></label>' +
		'<div class="col-md-8">' +
		'<input id="input2" name="" class="form-control" >' +
		'</div>' +
		'</div>' +

		'<div class="form-group" id="hide_form3">' +
		'<label id="super_input3" class="label-control col-md-3" style="padding: 6px 12px;"></label>' +
		'<div class="col-md-8">' +
		'<input id="input3" name="" class="form-control" >' +
		'</div>' +
		'</div>'
	var checker;
	var checker1;
	$('#addqual').click(function () {
		$('#edit_form_resume').html('');
		var i = 0;
		$('#edit_resume').modal('show');
		$('.modal-title').text('Add Qualifications/Skills');
		$('#form_content').html(form);
		$('#super_input').text('Add Skill');

		$('#input').attr('name', 'skill');

		$('#hide_form1').css({
			'display': 'none'
		});
		$('#hide_form2').css({
			'display': 'none'
		});
		$('#hide_form3').css({
			'display': 'none'
		});

		$('#data_input').val('skill');
		$('#input').keyup(function () {
			var checker = $('#input').val();
			if (checker.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});

		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: true,
			dataType: 'json',
			success: function (data) {
				if (data.skills) {
					var edit_skills = "";
					for (i = 0; i < data.skills.length; i++) {
						edit_skills += '<div class="col-xs-11 col-sm-11 col-md-11"><ul class="resume-list">' +
							'<li>' + data.skills[i].skill + '</li>' +
							'</div></ul>' +
							'<div class="col-xs-1 col-sm-1 col-md-1">' +
							'<button class="resume-delete skill-delete" id="' + i + '" value="' + data.skills[i].skill_id + '"><i class="fa fa-times"></i></button>' +
							'</div>';
					}
					$('#edit_form_resume').html(edit_skills);
				}
			},
			error: function (data) {

			}
		})
	})




	$('#addwork').click(function () {
		$('#edit_form_resume').html('');
		$('#edit_resume').modal('show');
		$('.modal-title').text('Add Working Experience');
		$('#form_content').html(form);

		$('#super_input').text('Position');
		$('#super_input1').text('Company');
		$('#super_input2').text('Date Started');
		$('#super_input3').text('Date Ended');

		$('#input1').attr('type', 'text');
		$('#input2').attr('type', 'date');
		$('#input3').attr('type', 'date');

		$('#input').attr('name', 'position');
		$('#input1').attr('name', 'company');
		$('#input2').attr('name', 'date_start');
		$('#input3').attr('name', 'date_end');
		$('#input2').attr('required', 'required');
		$('#input3').attr('required', 'required');

		$('#data_input').val('work');



		$('#input').keyup(function () {
			checker = $('#input').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$('#input1').keyup(function () {
			checker1 = $('#input1').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});


		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: true,
			dataType: 'json',
			success: function (data) {
				var edit_workxp = '';
				if (data.workxp) {
					for (i = 0; i < data.workxp.length; i++) {
						edit_workxp += '<div class="col-xs-11 col-sm-11 col-md-11"><ul class="resume-list">' +
							'<li>' + data.workxp[i].position + '</li>' +


							'<li>' + data.workxp[i].company + '</li>' +
							'<li>' + data.workxp[i].date_start + '</li>' +
							'<li>' + data.workxp[i].date_end + '</li>' +
							'</div></ul>' +
							'<div class="col-xs-1 col-sm-1 col-md-1">' +
							'<button class="resume-delete work-delete" id="' + i + '" value="' + data.workxp[i].work_id + '"><i class="fa fa-times"></i></button>' +
							'</div>';

					}
					$('#edit_form_resume').html(edit_workxp);
				}
			},
			error: function (data) {

			}
		})
	})

	$('#addacco').click(function () {
		$('#edit_form_resume').html('');
		$('#edit_resume').modal('show');
		$('.modal-title').text('Add Accomplishments');
		$('#form_content').html(form);

		$('#super_input').text('Accomplishment');
		$('#super_input1').text('Affiliation');

		$('#input1').attr('type', 'text');

		$('#input').attr('name', 'accomplishment');
		$('#input1').attr('name', 'affiliation');

		$('#data_input').val('accomplishment');

		$('#hide_form2').css({
			'display': 'none'
		});
		$('#hide_form3').css({
			'display': 'none'
		});
		$('#input').keyup(function () {
			checker = $('#input').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$('#input1').keyup(function () {
			checker1 = $('#input1').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: true,
			dataType: 'json',
			success: function (data) {
				var edit_accomplishment = '';
				if (data.accomplishment) {
					for (i = 0; i < data.accomplishment.length; i++) {
						edit_accomplishment += '<div class="col-xs-11 col-sm-11 col-md-11"><ul class="resume-list">' +
							'<li>' + data.accomplishment[i].accomplishment + '</li>' +

							'<li>' + data.accomplishment[i].affiliation + '</li>' +
							'</div></ul>' +
							'<div class="col-xs-1 col-sm-1 col-md-1">' +
							'<button class="resume-delete acc-delete" id="' + i + '" value="' + data.accomplishment[i].accomplishment_id + '"><i class="fa fa-times"></i></button>' +
							'</div>';
					}
					$('#edit_form_resume').html(edit_accomplishment);
				}
			},
			error: function (data) {

			}
		})
	})
	$('#addeduc').click(function () {
		$('#edit_form_resume').html('');
		$('#edit_resume').modal('show');
		$('.modal-title').text('Add Educational Background');
		$('#form_content').html(form);

		$('#super_input').text('Level');
		$('#super_input1').text('Name of School');
		$('#super_input2').text('Date Started');
		$('#super_input3').text('Date Graduated');

		$('#input1').attr('type', 'text');
		$('#input2').attr('type', 'date');
		$('#input3').attr('type', 'date');
		$('#input2').attr('required', 'required');
		$('#input3').attr('required', 'required');

		$('#input').attr('name', 'level');
		$('#input1').attr('name', 'school');
		$('#input2').attr('name', 'start');
		$('#input3').attr('name', 'graduate');

		$('#data_input').val('education');
		$('#input').keyup(function () {
			checker = $('#input').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$('#input1').keyup(function () {
			checker1 = $('#input1').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: true,
			dataType: 'json',
			success: function (data) {
				var edit_education = '';
				if (data.education) {
					for (i = 0; i < data.education.length; i++) {
						edit_education += '<div class="col-xs-11 col-sm-11 col-md-11"><ul class="resume-list">' +
							'<li>' + data.education[i].level + '</li>' +

							'<li>' + data.education[i].school + '</li>' +
							'<li>' + data.education[i].start + '</li>' +
							'<li>' + data.education[i].graduated + '</li>' +
							'</div></ul>' +
							'<div class="col-xs-1 col-sm-1 col-md-1">' +
							'<button class="resume-delete educ-delete" id="' + i + '" value="' + data.education[i].educ_id + '"><i class="fa fa-times"></i></button>' +
							'</div>';

					}
					$('#edit_form_resume').html(edit_education);
				}
			},
			error: function (data) {

			}
		})

	})

	$('#addsemi').click(function () {
		$('#edit_form_resume').html('');
		$('#edit_resume').modal('show');
		$('.modal-title').text('Add Seminars Attended');
		$('#form_content').html(form);

		$('#super_input').text('Name of Seminar');
		$('#super_input1').text('Date');
		$('#super_input2').text('Conducted by');

		$('#input1').attr('type', 'date');
		$('#input2').attr('type', 'text');

		$('#input').attr('name', 'seminar');
		$('#input1').attr('name', 'seminar_date');
		$('#input1').attr('required', 'required');
		$('#input2').attr('name', 'conductedby');

		$('#data_input').val('seminar');

		$('#hide_form3').css({
			'display': 'none'
		});
		$('#input').keyup(function () {
			checker = $('#input').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$('#input2').keyup(function () {
			checker1 = $('#input2').val();
			if (checker.length > 0 && checker1.length > 0) {
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: true,
			dataType: 'json',
			success: function (data) {
				var edit_seminars = '';
				if (data.seminars) {
					for (i = 0; i < data.seminars.length; i++) {
						edit_seminars += '<div class="col-xs-11 col-sm-11 col-md-11"><ul class="resume-list">' +
							'<li>' + data.seminars[i].seminar + '</li>' +

							'<li>' + data.seminars[i].seminar_date + '</li>' +
							'<li>' + data.seminars[i].conductedby + '</li>' +
							'</div></ul>' +
							'<div class="col-xs-1 col-sm-1 col-md-1">' +
							'<button class="resume-delete semi-delete" id="' + i + '" value="' + data.seminars[i].seminar_id + '"><i class="fa fa-times"></i></button>' +
							'</div>';

					}
					$('#edit_form_resume').html(edit_seminars);
				}
			},
			error: function (data) {

			}
		})

	})

	$('#form_resume').submit(function () {
		$("#btnsubmit_resume").attr("disabled", "disabled");
		var formData = $('#form_resume').serialize();
		console.log(formData);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'edit_resume',
			data: formData,
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {
					alert('inserted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});
	})

	var info;
	$(".btn-info").click(function (e) {
		if (!info.success || !info.seminars || !info.accomplishment || !info.skills || !info.workxp || !info.education) {
			e.preventDefault();
		}
		console.log(info);
	});

	function show_resume() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: false,
			dataType: 'json',
			success: function (data) {
				console.log(data);
				info = data;
				if (!data.success) {
					$('#ze_question').modal('show');
					$(".btn-info").attr("disabled", "disabled");
				}
				var skills = '';
				var xp = '';
				var accomplishments = '';
				var seminar = '';
				var education = '';
				var i;
				if (data.seminars) {
					for (i = 0; i < data.seminars.length; i++) {
						seminar += '<ul class="resume-list">' +
							'<li>' + data.seminars[i].seminar + '</li>' +
							'<li>' + data.seminars[i].seminar_date + '</li>' +
							'<li>' + data.seminars[i].conductedby + '</li>' +
							'</ul>';
					}
					$('#resume_seminar').html(seminar);
				} else {
					$(".btn-info").attr("disabled", "disabled");
				}

				if (data.accomplishment) {
					for (i = 0; i < data.accomplishment.length; i++) {
						accomplishments += '<ul class="resume-list">' +
							'<li>' + data.accomplishment[i].accomplishment + '</li>' +
							'<li>' + data.accomplishment[i].affiliation + '</li>' +
							'</ul>';
					}
					$('#resume_accomplishments').html(accomplishments);
				} else {
					$(".btn-info").attr("disabled", "disabled");
				}
				if (data.skills) {
					for (i = 0; i < data.skills.length; i++) {
						skills += '<ul class="resume-list">' +
							'<li>' + data.skills[i].skill + '</li>' +
							'</ul>';
					}
					$('#resume_skills').html(skills);
				} else {
					$(".btn-info").attr("disabled", "disabled");
				}
				if (data.workxp) {
					for (i = 0; i < data.workxp.length; i++) {
						xp += '<ul class="resume-list">' +
							'<li>' + data.workxp[i].position + '</li>' +
							'<li>' + data.workxp[i].company + '</li>' +
							'<li>' + data.workxp[i].date_start + '</li>' +
							'<li>' + data.workxp[i].date_end + '</li>' +
							'</ul>';
					}
					$('#resume_xp').html(xp);
				} else {
					$(".btn-info").attr("disabled", "disabled");
				}

				if (data.education) {
					for (i = 0; i < data.education.length; i++) {
						education += '<ul class="resume-list">' +
							'<li>' + data.education[i].level + '</li>' +
							'<li>' + data.education[i].school + '</li>' +
							'<li>' + data.education[i].start + '</li>' +
							'<li>' + data.education[i].graduated + '</li>' +
							'</ul>';
					}
					$('#resume_education').html(education);
				} else {
					$(".btn-info").attr("disabled", "disabled");
				}



			},
			error: function () {
				alert('Error');
			}
		});
	}



	function show_available_jobs() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_available_jobs',
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response.data);
				var html = '';
				var i;
				if (response.data) {
					for (i = 0; i < response.data.length; i++) {
						if (gender == response.data[i].pref_sex || response.data[i].pref_sex == 'Either') {
							html += '<tr>' +
								'<td>' + response.data[i].comp_name + '</td>' +
								'<td>' + response.data[i].position + '</td>' +
								'<td>' + response.data[i].no_applicants + '</td>' +
								'<td>' + response.data[i].pref_sex + '</td>' +
								'<td>' + response.data[i].pref_civstat + '</td>' +
								'<td>' + response.data[i].pref_educ + '</td>' +
								'<td>' + response.data[i].requirements + '</td>' +
								'<td>' + response.data[i].date_posted + '</td>' +
								'<td><button class="btn btn-success apply" value="' + response.data[i].job_id + '">Apply </button></td>' +
								'</tr>'
						}
					}
					$('#show_jobs').html(html)
				}
			},
			error: function () {
				alert('Error');
			}
		});
	}
	var job_id_app;
	$('.apply').click(function (e) {
		job_id_app = $(e.currentTarget).val();
		$('#apply_job').modal('show');
		$('.modal-title').text('Confirm Apply');
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_available_jobs',
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response.data);
				var html = '';
				var i;
				if (response.data) {
					for (i = 0; i < response.data.length; i++) {
						if (response.data[i].job_id == job_id_app) {
							html +=
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Company Name</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].comp_name + '</div></div>' +
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Position</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].position + '</div></div>' +
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Preferred Sex</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].pref_sex + '</div></div>' +
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Preferred Civil Status</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].pref_civstat + '</div></div>' +
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Preferred Education Attained</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].pref_educ + '</div></div>' +
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Requirements</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].requirements + '</div></div>' +
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Date Posted</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].date_posted + '</div></div>'
						}
					}
					$('#job_desc').html(html)
				}
			},
			error: function () {
				alert('Error');
			}
		})
	})

	$('#confirm_app').click(function () {
		var job_id = job_id_app;
		console.log(job_id);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'apply_job',
			data: {
				id: job_id
			},
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {
					alert('inserted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});
	})

	$(document).on('click', '.skill-delete', function (e) {
		var id = $(e.currentTarget).val();
		console.log(id);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'skill'
			},
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response) {
					alert('deleted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});

	});
	$(document).on('click', '.educ-delete', function (e) {
		var id = $(e.currentTarget).val();
		console.log(id);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'education'
			},
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {

					alert('deleted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});

	});
	$(document).on('click', '.work-delete', function (e) {
		var id = $(e.currentTarget).val();
		console.log(id);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'work'
			},
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {
					alert('deleted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});

	});
	$(document).on('click', '.semi-delete', function (e) {
		var id = $(e.currentTarget).val();
		console.log(id);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'seminar'
			},
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {

					alert('deleted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});

	});
	$(document).on('click', '.acc-delete', function (e) {
		var id = $(e.currentTarget).val();
		console.log(id);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'accomplishment'
			},
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {

					alert('deleted');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});

	});

	///////////////////////////////Change Functionalities
	$('#change_user').attr('disabled', 'disabled');
	$('#change_pass').attr('disabled', 'disabled');

	$('#new_user').keyup(function () {
		var checker = $('#new_user').val();

		$('#illegal_user').css({
			'display': 'none'
		});
		if (checker.length > 0) {
			if (/^[a-zA-Z0-9- ]*$/.test(checker) == false) {
				$('#change_user').attr('disabled', 'disabled');
				$('#illegal_user').removeAttr('style');
				$('#illegal_user').html('Your username contains illegal characters.');
			} else {
				$('#change_user').removeAttr('disabled');
			}

		} else {
			$('#change_user').attr('disabled', 'disabled');
		}
	});


	$("#form_change_user").submit(function () {
		var formData = $('#form_change_user').serialize();
		console.log(formData);
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'edit_username',
			data: formData,
			async: false,
			dataType: 'json',
			success: function (response) {
				console.log(response);
				if (response.success) {
					alert('data inserted');
				} else {
					alert('data not inserted');
				}

			},
			error: function () {
				alert('Error');
			}
		});


	})







});
