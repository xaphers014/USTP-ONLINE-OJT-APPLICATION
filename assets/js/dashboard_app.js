var job_ids = [];

$(function () {
	show_bio_data();
	show_resume();
	show_ongoing_applications();
	count_dashboard();
	show_available_jobs();
	show_graduate_info();
	has_resume();
	newsletter();

	function newsletter() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'newsletter',
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					$('#u_date_registered').html(response.date_registered[0].date_registered);
					$('#u_date_biodata').html(response.date_biodata[0].date);
					$('#u_date_graduate_info').html(response.date_graduate_info[0].date);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	}

	function has_resume() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'has_resume',
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					$('#has_resume').html('<i class="fa fa-check" title="You have completed your resume."></i>');
				}
				else {
					$('#has_resume').html('<i class="fa fa-times" title="You havent completed your resume."></i>');
				}
			},
			error: function () {
				alert('Error');
			}
		});
	}

	$('#graduate_form_info').submit(function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);
		var formData = $('#graduate_form_info').serialize();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'edit_graduate_info',
			data: formData,
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.operation == 'insert') {
					msg = 'data inserted successfully';
					toaster(msg);
				} else if (response.operation == 'update') {
					msg = 'data updated successfully';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	$(document).on('click', '.graduate_edit', function (e) {
		var id = $(e.currentTarget).val();

		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_graduate_info',
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					//Checks the radio button for employment
					$('#isEmployed').click(function () {
						if ($('#isEmployed').is(':checked')) {
							$('#employed_inputs').css({
								'display': 'block'
							}); //shows the employed exclusive inputs

							if(response.data[0] == null) {
								$('#e_g_hr_email,#e_g_date_hired,#e_g_company_name,#e_g_hr_person,#e_g_hr_no,#e_g_company_address,#e_g_job_position,#e_g_business_nature').val(''); // this resets the inputs	
							}
						}
					});

					$('#isNotEmployed').click(function () {
						if ($('#isNotEmployed').is(':checked')) {
							$('#employed_inputs').css({
								'display': 'none'
							}); //hides the employed exclusive inputs

							if (response.data[0] == null) {
								$('#e_g_company_name,#e_g_hr_person,#e_g_hr_no,#e_g_company_address,#e_g_job_position,#e_g_business_nature').val('N/A'); // this sets the inputs
								$('#e_g_date_hired').val('0001-01-01'); // with default values
								$('#e_g_hr_email').val('default@default.com'); // to prevent null values
							}
						}
					});

					grad_info();
					course_list();
					grad_info();

					function grad_info() {
						if (response.data[0].is_employed == 1) {
							$("#isEmployed").prop("checked", true);
							$('#employed_inputs').css({'display': 'block'});

							$("#e_g_job_position").val(response.data[0].job_position);
							$("#e_g_company_address").val(response.data[0].company_address);
							$("#e_g_year_graduated").val(response.data[0].year_graduated);
							$("#e_g_business_nature").val(response.data[0].business_nature);
							$("#e_g_college_graduated").val(response.data[0].college_graduated);
							$("#e_g_date_graduated").val(response.data[0].date_graduated);
							$("#e_g_date_hired").val(response.data[0].date_hired);
							$("#e_g_company_name").val(response.data[0].company_name);
							$("#e_g_hr_person").val(response.data[0].hr_person);
							$("#e_g_hr_no").val(response.data[0].hr_contact_no);
							$("#e_g_hr_email").val(response.data[0].hr_email);
							$("#e_g_degree_graduated").val(response.data[0].degree_graduated);
						} else {
							$("#isNotEmployed").prop("checked", true);
						}
					}
				}
			},
			error: function () {
				alert('Error');
			}
		});
		$('#graduate_edit_info').modal('show');
	});

	$('#e_g_college_graduated').click(function () {
		course_list();
	});

	function course_list() {
		var courses;
		var selected_college = $("#e_g_college_graduated option:selected").val();
		if (selected_college == 'College of Engineering and Architecture') {
			courses = "<option value =''>-- Select --</option>" +
				"<option value='Bachelor of Science in Architecture (BSARCH)'>Bachelor of Science in Architecture (BSARCH)</option>" +
				"<option value='Bachelor of Science in Civil Engineering (BSCE)'>Bachelor of Science in Civil Engineering (BSCE)</option>" +
				"<option value='Bachelor of Science in Electrical Engineering (BSEE)'>Bachelor of Science in Electrical Engineering (BSEE)</option>" +
				"<option value='Bachelor of Science in Electronics Engineering (BSECE)'>Bachelor of Science in Electronics Engineering (BSECE)</option>" +
				"<option value='Bachelor of Science in Mechanical Engineering (BSME)'>Bachelor of Science in Mechanical Engineering (BSME)</option>";
		} else if (selected_college == 'College of Information Technology and Computing') {
			courses = "<option value =''>-- Select --</option>" +
				"<option value='Bachelor of Science in Information Technology (BSIT)'>Bachelor of Science in Information Technology (BSIT)</option>" +
				"<option value='Bachelor of Science in Civil Engineering (BSCE)'>Bachelor of Science in Computer Engineering (BSCpE)</option>" +
				"<option value='Bachelor of Science in Technology Communication Management (BSTCM)'>Bachelor of Science in Technology Communication Management (BSTCM)</option>" +
				"<option value='Bachelor of Science in Data Science (BSDS)'>Bachelor of Science in Data Science (BSDS)</option>";
		} else if (selected_college == 'College of Science and Mathematics') {
			courses = "<option value =''>-- Select --</option>" +
				"<option value='Bachelor of Science in Applied Mathematics'>Bachelor of Science in Applied Mathematics</option>" +
				"<option value='Bachelor of Science in Applied Physics'>Bachelor of Science in Applied Physics</option>" +
				"<option value='Bachelor of Science in Chemistry '>Bachelor of Science in Chemistry</option>" +
				"<option value='Bachelor of Science in Environmental Science'>Bachelor of Science in Environmental Science </option>" +
				"<option value='Bachelor of Science in Food Technology'>Bachelor of Science in Food Technology</option>";
		} else if (selected_college == 'College of Science and Technology Education') {
			courses = "<option value =''>-- Select --</option>" +
				"<option value='Bachelor of Elementary Education, Major in Special Education (BEEd-SpEd)'>Bachelor of Elementary Education, Major in Special Education (BEEd-SpEd)</option>" +
				"<option value='Bachelor of Public Administration(BPA)'>Bachelor of Public Administration(BPA)</option>" +
				"<option value='Bachelor of Science in Mathematics Education(BSMathEd)'>Bachelor of Science in Mathematics Education(BSMathEd)</option>" +
				"<option value='Bachelor of Science in Sciences Education (Bachelor of ScienceiED)'>Bachelor of Science in Sciences Education (Bachelor of ScienceiED)</option>" +
				"<option value='Bachelor of Technical Teacher Education (BTTE)'>Bachelor of Technical Teacher Education (BTTE)</option>" +
				"<option value='Bachelor of Technolgy and Livelyhood Education (BTLED)'>Bachelor of Technolgy and Livelyhood Education (BTLED)</option>";
		} else if (selected_college == 'College of Technology') {
			courses = "<option value =''>-- Select --</option>" +
				"<option value='Bachelor of Science in Automotive Mechanical Technology (BSAMT) Major in Automotive Technology'>Bachelor of Science in Automotive Mechanical Technology (BSAMT) Major in Automotive Technology</option>" +
				"<option value='Bachelor of Science in Automotive Mechanical Technology (BSAMT) Major in Mechanical Technology'>Bachelor of Science in Automotive Mechanical Technology (BSAMT) Major in Mechanical Technology</option>" +
				"<option value='Bachelor of Science in Electrical and Technology Management(BSETM)'>Bachelor of Science in Electrical and Technology Management(BSETM)</option>" +
				"<option value='Bachelor of Science in Electro-Mechanical Technology (BSEMT)'>Bachelor of Science in Electro-Mechanical Technology (BSEMT)</option>" +
				"<option value='Bachelor of Science in Electronics and Communication Technology (BSECT)'>Bachelor of Science in Electronics and Communication Technology (BSECT)</option>";
		} else {
			courses = "<option value =''>-- Select --</option>";
		}
		$('#e_g_degree_graduated').html(courses);
	}


	if (window.location.pathname == "/ojt/Applicant/graduate_form") {
		$('#isEmployed').click(function () {
			if ($('#isEmployed').is(':checked')) {
				$('#employed_inputs').css({
					'display': 'block'
				}); //shows the employed exclusive inputs

				$('#e_g_hr_email,#e_g_date_hired,#e_g_company_name,#e_g_hr_person,#e_g_hr_no,#e_g_company_address,#e_g_job_position,#e_g_business_nature').val(''); // this resets the inputs	

			}
		});

		$('#isNotEmployed').click(function () {
			if ($('#isNotEmployed').is(':checked')) {
				$('#employed_inputs').css({
					'display': 'none'
				}); //hides the employed exclusive inputs


				$('#e_g_company_name,#e_g_hr_person,#e_g_hr_no,#e_g_company_address,#e_g_job_position,#e_g_business_nature').val('N/A'); // this sets the inputs
				$('#e_g_date_hired').val('0001-01-01'); 																				 // with default values
				$('#e_g_hr_email').val('default@default.com'); 																			 // to prevent null values
			}
		});
	}
		

	function show_graduate_info() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_graduate_info',
			async: true,
			dataType: 'json',
			success: function (response) {	
				if (response.success) {
					if (response.data[0].is_employed == 1) {
						$("#user_employment_stat").html('Employed');
					}
					else{
						$("#user_employment_stat").html('Unemployed');
					}
					$("#user_job_position").html(response.data[0].job_position);
					$("#user_company_address").html(response.data[0].company_address);
					$("#user_business_nature").html(response.data[0].business_nature);
					$("#user_degree_graduated").html(response.data[0].degree_graduated);
					$("#user_college_graduated").html(response.data[0].college_graduated);
					$("#user_year_graduated").html(response.data[0].year_graduated);
					$("#user_date_hired").html(response.data[0].date_hired);
					$("#user_company_name").html(response.data[0].company_name);
					$("#user_hr_person").html(response.data[0].hr_person);
					$("#user_hr_contact_no").html(response.data[0].hr_contact_no);
					$("#user_hr_email").html(response.data[0].hr_email);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	}

	function count_dashboard() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'count_dashboard',
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.data != null) {
					$('#applications_count').html(response.data.pending_applicant);
				} else {
					$('#applications_count').html(0);
				}
				if (response.data1 != null) {
					if (response.data != null) {
						$('#jobs_count').html(response.data1.jobs_posted - response.data.pending_applicant);
					}
					else {
						$('#jobs_count').html(response.data1.jobs_posted);
					}
				} else {
					$('#jobs_count').html(0);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	}

	$('.btn-default').attr('disabled', 'disabled');
	$('#image_attach').click(function () {
		$('.btn-default').removeAttr('disabled');
		setInterval(function () {
			if ($('#image_attach').val().length < 1) {
				$('.btn-default').attr('disabled', 'disabled');
			} else {
				$('.btn-default').removeAttr('disabled');
			}
		}, 0);
	});

	//For Biodata Functions Start HERE!
	function show_bio_data() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_bio',
			async: true,
			dataType: 'json',
			success: function (response) {
				var html = '';
				if (response.success) {
					$("#user_fullname").val(response.data.fname + ' ' + response.data.mname + ' ' + response.data.lname);
					$("#user_sex").val(response.data.sex);
					$("#user_birthdate").val(response.data.birthdate);
					$("#user_nationality").val(response.data.nationality);
					$("#user_civil_status").val(response.data.civil_status);
					$("#user_contact_no").val(response.data.contact_no);
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
						$('#prof_pic').attr('src', '../../ojt/assets/img/icons/default-profile.png');
						$('#prof_pic1').attr('src', '../../ojt/assets/img/icons/default-profile.png');
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
				if (response.success) {
					$("#bio_fname").val(response.data.fname);
					$("#bio_mname").val(response.data.mname);
					$("#bio_lname").val(response.data.lname);
					$("#bio_sex").val(response.data.sex);
					$("#bio_civil_status").val(response.data.civil_status);
					$("#bio_contact_no").val(response.data.contact_no);
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
	});

	$('#form_bio').submit(function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload();
		}, 3000);

		var formData = $('#form_bio').serialize();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'edit_bio',
			data: formData,
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.operation == 'insert') {
					msg = 'data inserted successfully';
					toaster(msg);
				} else if (response.operation == 'update') {
					msg = 'data updated successfully';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
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
		'</div>';
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
				if (/^[a-zA-Z0-9- ]*$/.test(checker) == true) {
					$('#btnsubmit_resume').removeAttr('disabled');

				}
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});

		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: false,
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
		});
	});




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
				if (/^[a-zA-Z0-9- ]*$/.test(checker) == false) {
					$('#btn_submit_resume').attr('disabled', 'disabled');
				}
				$('#btnsubmit_resume').removeAttr('disabled');
			} else {
				$('#btnsubmit_resume').attr('disabled', 'disabled');
			}
		});


		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: false,
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
		});
	});

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
			async: false,
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
		});
	});
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
			async: false,
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
		});

	});

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
			async: false,
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
		});
	});

	$('#form_resume').submit(function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);

		$("#btnsubmit_resume").attr("disabled", "disabled");
		var formData = $('#form_resume').serialize();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'edit_resume',
			data: formData,
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					msg = 'data updated successfully';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	function show_resume() {
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_resume',
			async: false,
			dataType: 'json',
			success: function (data) {
				info = data;
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
					$(".btn-info").click(function (e) {
						e.preventDefault();
					});
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
					$(".btn-info").click(function (e) {
						e.preventDefault();
					});
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
					$(".btn-info").click(function (e) {
						e.preventDefault();
					});
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
					$(".btn-info").click(function (e) {
						e.preventDefault();
					});
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
					$(".btn-info").click(function (e) {
						e.preventDefault();
					});
				}
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
				var html = '';
				var i;
				if (response.data) {
					for (i = 0; i < response.data.length; i++) {
						if (jQuery.inArray(response.data[i].job_id, job_ids) < 0) {
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
								'</tr>';
						}
					}
				}
				$('#show_jobs').html(html);
			}
		});
	}

	function show_ongoing_applications() {
		var job_id = [];

		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_ongoing_applications',
			async: false,
			dataType: 'json',
			success: function (response) {
				var html = '';
				var i;
				if (response.data) {
					for (i = 0; i < response.data.length; i++) {
						job_id.push(response.data[i].job_id);
						html += '<tr>' +
							'<td>' + response.data[i].comp_name + '</td>' +
							'<td>' + response.data[i].comp_hr + '</td>' +
							'<td>' + response.data[i].position + '</td>' +
							'<td>' + response.data[i].requirements + '</td>' +
							'<td>' + response.data[i].date_posted + '</td>' +
							'<td>' + response.data[i].date_applied + '</td>';
						if (response.data[i].app_status == "1") {
							html += '<td><button class="btn btn-danger cancel" value="' + response.data[i].pending_id + '"><i class="fa fa-times"></i> Cancel</button></td>' +
								'</tr>';
						} else if (response.data[i].app_status == "0") {
							html += '<td><button class="btn btn-primary cancel" value="' + response.data[i].pending_id + '"><i class="fa fa-times"></i> Reapply</button></td>' +
								'</tr>';
						} else {
							html += '<td>Denied</td>' +
								'</tr>';
						}

					}
					$('#show_ongoing_application').html(html);
				}
				$('#show_ongoing_application').html(html);
			}
		});
		job_ids = job_id;
	}

	$(document).on('click', '.cancel', function (e) {
		$('#cancel_application').modal('show');
		$('.modal-title').text('Cancel Application?');
		job_id_app = $(e.currentTarget).val();
	});

	$(document).on('click', '.apply', function (e) {
		$('#apply_job').modal('show');
		$('.modal-title').text('Confirm Apply');
		job_id_app = $(e.currentTarget).val();
		$.ajax({
			type: 'ajax',
			method: 'get',
			url: 'show_available_jobs',
			async: false,
			dataType: 'json',
			success: function (response) {
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
								'<div class="row"><div class="col-xs-4 col-sm-4 col-md-4"><strong>Date Posted</strong></div><div class="col-xs-8 col-sm-8 col-md-8">:&nbsp' + response.data[i].date_posted + '</div></div>';
						}
					}
				}
				$('#job_desc').html(html);
			}
		});
	});

	$('#confirm_app').click(function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);
		var job_id = job_id_app;

		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'apply_job',
			data: {
				id: job_id
			},
			async: true,
			dataType: 'json',
			success: function (response) {

				if (response.success) {
					msg = 'data inserted successfully';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	$('#confirm_cancel').click(function () {
		var job_id = job_id_app;

		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'cancel_job',
			data: {
				id: job_id
			},
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					alert('JOB APPLICATION ABORTED');
					location.reload();
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});


	$(document).on('click', '.skill-delete', function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);

		var id = $(e.currentTarget).val();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'skill'
			},
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response) {
					msg = 'data successfully updated';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	$(document).on('click', '.educ-delete', function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);

		var id = $(e.currentTarget).val();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'education'
			},
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {

					msg = 'Data successfully updated';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	$(document).on('click', '.work-delete', function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);

		var id = $(e.currentTarget).val();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'work'
			},
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					msg = 'Data successfully updated';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	$(document).on('click', '.semi-delete', function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);

		var id = $(e.currentTarget).val();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'seminar'
			},
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {

					msg = 'Data successfully updated';
					toaster(msg);
				}
			},
			error: function () {
				alert('Error');
			}
		});
	});

	$(document).on('click', '.acc-delete', function (e) {
		e.preventDefault();
		setTimeout(() => {
			location.reload()
		}, 3000);

		var id = $(e.currentTarget).val();
		$.ajax({
			type: 'ajax',
			method: 'post',
			url: 'delete_resume',
			data: {
				id: id,
				field: 'accomplishment'
			},
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					msg = 'Data successfully updated';
					toaster(msg);
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
		var formData = $('#form_change_user').serializeArray();

		$.ajax({
			type: 'ajax',
			url: 'change_username',
			method: 'POST',
			data: formData,
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					$('#success_user').removeAttr('style');
					$('#success_user').html('Username Updated');
				}

			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert(textStatus + " " + errorThrown);
			}
		});
	});

	$('#prof_pic1').load(function () {
		setInterval(function () {
			$('#illegal_user1').css({
				'display': 'none'
			});
			var checker_pass = $('#pass_new').val();
			var checker_con = $('#pass_con').val();
			if (checker_pass.length > 0 && checker_con.length > 0) {
				$('#change_pass').removeAttr('disabled');
				if (checker_con != checker_pass) {
					$('#change_pass').attr('disabled', 'disabled');
					$('#illegal_user1').removeAttr('style');
					$('#illegal_user1').html('Passwords do not match');
				}

			} else {
				$('#change_pass').attr('disabled', 'disabled');

			}
		}, 0);
	});


	$("#form_change_password").submit(function () {
		var formData = $('#form_change_password').serializeArray();

		$.ajax({
			type: 'ajax',
			url: 'change_password',
			method: 'POST',
			data: formData,
			async: true,
			dataType: 'json',
			success: function (response) {
				if (response.success) {
					$('#success_user1').removeAttr('style');
					$('#success_user1').html('Password Updated');
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert(textStatus + " " + errorThrown);
			}
		});
	});
});


function toaster(msg) {
	document.querySelector('#toaster span').innerText = msg;
	var x = document.getElementById("toaster");
	x.className = "show";
	setTimeout(() => { x.className = x.className.replace("show", "") }, 3000);

}

function toaster_error(msg) {
	var err = document.querySelector('#toaster span');
	err.innerText = msg;
	err.className = "danger";
	setTimeout(() => { err.className = ""; }, 3000);
}