<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Company extends CI_Controller {	
	function __constructor(){
		parent::__constructor();
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Origin: <origin>");
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header('Access-Control-Request-Method: OPTIONS, POST, GET, PUT, DELETE');
	}

	public function require_form() {
		$this->load->view('company/info_form');
	}

	public function dashboard() {
        $data['content'] = 'company/dashboard';
        
		$this->load->view('templates/company/content', $data);
	}
	
	public function employees() {
		$data['content'] = 'company/employees';
        
		$this->load->view('templates/company/content', $data);
	}

	public function post_job() {
		$data['content'] = 'company/post_job';
        
		$this->load->view('templates/company/content', $data);
	}

	public function pending_apps() {
		$data['content'] = 'company/pending_apps';
        
		$this->load->view('templates/company/content', $data);
	}
	
	public function company_info() {
		$data['content'] = 'company/company_info';
        
		$this->load->view('templates/company/content', $data);
	}

	public function user_settings(){
		$data['content'] = 'user_settings';
        
		$this->load->view('templates/company/content', $data);
	}

	public function upload(){
		$this->company->upload_photo();
	}


	//Functional 
	public function notification() {
		$result = $this->company->notification();
		$msg['success'] = false;
		if($result[0]){
			$msg['success'] = true;
			$msg['count_p_jobs'] = $result[1];
			$msg['count_p_apps'] = $result[2];
		}

		echo json_encode($msg);
	}

	public function show_info() {
		$result = $this->company->show_info();
		$msg['success'] = false;
		if($result[0]){
			$msg['success'] = true;
			$msg['data'] = $result[1];
			$msg['pic'] = $result[2];
		}

		echo json_encode($msg);
	}

	public function edit_info(){
		$result = $this->company->edit_info();
		$msg['success'] = false;

		if($result[0]){
			$msg['success'] = true;
			$msg['operation'] = $result[1];
		}
		echo json_encode($msg);
	}

	//Job Posting Functionals
	public function show_jobs(){
		$result = $this->company->show_jobs();
		$msg['success'] = false;
		if($result[0]){
			$msg['success'] = true;
			$msg['data'] = $result[1];
		}

		echo json_encode($msg);
		
	}
	public function show_job_edit(){
		$result = $this->company->show_edit_job();
		$msg['success'] = false;

		if($result[0]){
			$msg['success'] = true;
			$msg['data'] = $result[1];
			
		}
		echo json_encode($msg);
	}

	public function post_job_hiring(){
		$result = $this->company->post_job();
		$msg['success'] = false;

		if($result[0]){
			$msg['success'] = true;
			$msg['operation'] = $result[1];
		}
		echo json_encode($msg);
	}

	public function edit_job(){
		$result = $this->company->edit_job();
		$msg['success'] = false;

		if($result[0]){
			$msg['success'] = true;
		}
		echo json_encode($msg);
	}


	public function end_job(){
		$result = $this->company->end_job();
		$msg['success'] = false;

		if($result[0]){
			$msg['success'] = true;
		}
		echo json_encode($msg);
	}

	public function show_pending_applications(){
		$result = $this->company->show_pending_applications();
		$msg['success'] = false;

		if($result[0]){
			$msg['success'] = true;
			$msg['data'] = $result[1];
		}
		echo json_encode($msg);
	}

	public function limit_posted_jobs(){
		$result = $this->company->limit_posted_jobs();
		$msg['success'] = false;

		if ($result[0]) {
			$msg['success'] = true;
			$msg['count_posted_jobs'] = $result[1];
			$msg['max_posted_jobs'] = $result[2];
		}
		echo json_encode($msg);
	}
}