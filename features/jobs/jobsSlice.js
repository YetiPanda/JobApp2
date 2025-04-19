import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

// Sample data for development
const sampleJobs = [
  {
    id: 0,
    position: "Senior Product Manager",
    company: "Ace Corporation LLC",
    location: "Ashburn, Virginia, USA",
    salary: "$50,000.00",
    status: "ACCEPTED",
    dateApplied: "2025-03-22",
    interview: "N/A",
    followUp: "N/A",
    interest: 1,
    notes: "Good company culture, opportunity for growth"
  },
  {
    id: 1,
    position: "Product Owner",
    company: "Chase LLC",
    location: "Ashburn, Virginia, USA",
    salary: "$50,000.00",
    status: "NEGOTIATING",
    dateApplied: "2025-04-01",
    interview: "N/A",
    followUp: "N/A",
    interest: 1,
    notes: "Interesting role with good benefits"
  },
  {
    id: 2,
    position: "Product Manager",
    company: "Web Triangle LLC",
    location: "Ashburn, Virginia, USA",
    salary: "$50,000.00",
    status: "NEGOTIATING",
    dateApplied: "2025-03-29",
    interview: "N/A",
    followUp: "N/A",
    interest: 2,
    notes: "Fast growing company"
  },
  {
    id: 3,
    position: "Senior Marketing Manager",
    company: "Pentagram",
    location: "Ashburn, Virginia, USA",
    salary: "$50,000.00",
    status: "APPLIED",
    dateApplied: "2025-04-05",
    interview: "N/A",
    followUp: "N/A",
    interest: 3,
    notes: "Creative team and excellent design focus"
  },
  {
    id: 4,
    position: "Senior Product Manager",
    company: "SolarInformatics",
    location: "Ashburn, Virginia, USA",
    salary: "$50,000.00",
    status: "APPLYING",
    dateApplied: "2025-04-10",
    interview: "N/A",
    followUp: "N/A",
    interest: 2,
    notes: "Sustainable tech company"
  }
];

// Modified to use mockdata instead of actual network request
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async () => {
    // Instead of making a network request, return the sample data
    // This simulates a successful API response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleJobs);
      }, 1000); // Simulate network delay
    });
  }
);

export const postJob = createAsyncThunk(
  "jobs/postJob", 
  async (job, { dispatch }) => {
    const newJob = {
      ...job,
      date: new Date().toISOString()
    };
    
    // In a real app, this would post to a server
    // For now, we'll just return the new job
    // setTimeout simulates network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newJob);
      }, 1000);
    });
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: { 
    isLoading: true, 
    errMess: null, 
    jobsArray: [] 
  },
  reducers: {
    addJob: (state, action) => {
      const newJob = {
        ...action.payload,
        id: state.jobsArray.length 
      };
      state.jobsArray.push(newJob);
    },
    updateJobStatus: (state, action) => {
      const { jobId, newStatus } = action.payload;
      const job = state.jobsArray.find(job => job.id === jobId);
      if (job) {
        job.status = newStatus;
      }
    },
    updateJob: (state, action) => {
      const updatedJob = action.payload;
      const index = state.jobsArray.findIndex(job => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobsArray[index] = updatedJob;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.jobsArray = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch failed";
      })
      .addCase(postJob.fulfilled, (state, action) => {
        const newJob = {
          ...action.payload,
          id: state.jobsArray.length
        };
        state.jobsArray.push(newJob);
      });
  },
});

export const { addJob, updateJobStatus, updateJob } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;