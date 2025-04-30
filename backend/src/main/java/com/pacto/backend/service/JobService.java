package com.pacto.backend.service;

import com.pacto.backend.model.Job;
import com.pacto.backend.model.User;
import com.pacto.backend.repository.JobRepository;
import com.pacto.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public Job createJob(Job job, Long recruiterId) {
        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new NoSuchElementException("Recruiter not found"));
        
        job.setRecruiter(recruiter);
        job.setPostedDate(LocalDateTime.now());
        job.setIsActive(true);
        
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Job not found"));
        
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setDepartment(updatedJob.getDepartment());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setRequirements(updatedJob.getRequirements());
        existingJob.setDeadline(updatedJob.getDeadline());
        
        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Job not found"));
        
        job.setIsActive(false);
        jobRepository.save(job);
    }

    public List<Job> getAllActiveJobs() {
        return jobRepository.findByIsActiveTrue();
    }

    public List<Job> getJobsByRecruiter(Long recruiterId) {
        return jobRepository.findByRecruiterId(recruiterId);
    }

    public List<Job> getJobsByDepartment(String department) {
        return jobRepository.findByDepartment(department);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Job not found"));
    }
} 