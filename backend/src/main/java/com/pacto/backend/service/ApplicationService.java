package com.pacto.backend.service;

import com.pacto.backend.model.Application;
import com.pacto.backend.model.ApplicationStatus;
import com.pacto.backend.model.Job;
import com.pacto.backend.model.User;
import com.pacto.backend.repository.ApplicationRepository;
import com.pacto.backend.repository.JobRepository;
import com.pacto.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public Application createApplication(Long candidateId, Long jobId) {
        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() -> new NoSuchElementException("Candidate not found"));
        
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new NoSuchElementException("Job not found"));
        
        if (job.getStatus() == null || !job.getStatus().equals("OPEN")) {
            throw new IllegalStateException("Job is not available for applications");
        }
        
        if (applicationRepository.existsByCandidateIdAndJobId(candidateId, jobId)) {
            throw new IllegalStateException("Application already exists");
        }
        
        Application application = new Application();
        application.setCandidate(candidate);
        application.setJob(job);
        application.setApplicationDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PENDING);
        
        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Long id, ApplicationStatus newStatus, String feedback) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));
        
        application.setStatus(newStatus);
        application.setFeedback(feedback);
        application.setLastUpdateDate(LocalDateTime.now());
        
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByCandidate(Long candidateId) {
        return applicationRepository.findByCandidateId(candidateId);
    }

    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getApplicationsByStatus(ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));
    }
} 