import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
  const jobs = useSelector((state) => state.jobs);
  
  // Count jobs by status
  const jobCounts = jobs.jobsArray.reduce((counts, job) => {
    counts[job.status] = (counts[job.status] || 0) + 1;
    return counts;
  }, {});
  
  const getJobsByStatus = (status) => {
    return jobs.jobsArray.filter(job => job.status === status);
  };
  
  const handleStatusPress = (status) => {
    // Navigate to directory with filter by status
    navigation.navigate('DirectoryNav', { 
      screen: 'Directory',
      params: { statusFilter: status }
    });
  };
  
  const handleSeeAllPress = () => {
    // Navigate to directory with no filter
    navigation.navigate('DirectoryNav', { 
      screen: 'Directory',
      params: { statusFilter: null }  // Explicitly set filter to null
    });
  };
  
  // Get most recent job applications (last 3)
  const recentJobs = [...jobs.jobsArray]
    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
    .slice(0, 3);
    
  // Find jobs with upcoming interviews (if we had interview dates)
  const upcomingInterviews = jobs.jobsArray.filter(job => 
    job.status === 'INTERVIEWING' || job.status === 'NEGOTIATING'
  ).slice(0, 3);
  
  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Job Application Status</Card.Title>
          <Card.Divider />
          
          <View style={styles.statusPipeline}>
            <Pressable 
              style={[styles.statusItem, styles.bookmarkedStatus]} 
              onPress={() => handleStatusPress('BOOKMARKED')}
            >
              <Text style={styles.statusCount}>{jobCounts.BOOKMARKED || 0}</Text>
              <Text style={styles.statusLabel}>BOOKMARKED</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.statusItem, styles.applyingStatus]} 
              onPress={() => handleStatusPress('APPLYING')}
            >
              <Text style={styles.statusCount}>{jobCounts.APPLYING || 0}</Text>
              <Text style={styles.statusLabel}>APPLYING</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.statusItem, styles.appliedStatus]} 
              onPress={() => handleStatusPress('APPLIED')}
            >
              <Text style={styles.statusCount}>{jobCounts.APPLIED || 0}</Text>
              <Text style={styles.statusLabel}>APPLIED</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.statusItem, styles.interviewingStatus]} 
              onPress={() => handleStatusPress('INTERVIEWING')}
            >
              <Text style={styles.statusCount}>{jobCounts.INTERVIEWING || 0}</Text>
              <Text style={styles.statusLabel}>INTERVIEWING</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.statusItem, styles.negotiatingStatus]} 
              onPress={() => handleStatusPress('NEGOTIATING')}
            >
              <Text style={styles.statusCount}>{jobCounts.NEGOTIATING || 0}</Text>
              <Text style={styles.statusLabel}>NEGOTIATING</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.statusItem, styles.acceptedStatus]} 
              onPress={() => handleStatusPress('ACCEPTED')}
            >
              <Text style={styles.statusCount}>{jobCounts.ACCEPTED || 0}</Text>
              <Text style={styles.statusLabel}>ACCEPTED</Text>
            </Pressable>
          </View>
        </Card>
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" duration={1000} delay={1000}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Recent Applications</Card.Title>
          <Card.Divider />
          
          {recentJobs.length > 0 ? (
            recentJobs.map((job) => (
              <Pressable 
                key={job.id} 
                style={styles.jobItem}
                onPress={() => navigation.navigate('JobInfo', { job })}
              >
                <View style={styles.jobHeader}>
                  <Text style={styles.jobPosition}>{job.position}</Text>
                  <Text style={[styles.jobStatus, getStatusStyle(job.status)]}>{job.status}</Text>
                </View>
                <Text style={styles.jobCompany}>{job.company}</Text>
                <Text style={styles.jobDate}>Applied: {job.dateApplied}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.emptyText}>No recent applications</Text>
          )}
          
          <Pressable 
            style={styles.seeAllButton}
            onPress={handleSeeAllPress}
          >
            <Text style={styles.seeAllText}>See All Jobs</Text>
          </Pressable>
        </Card>
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" duration={1000} delay={1500}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Upcoming Interviews</Card.Title>
          <Card.Divider />
          
          {upcomingInterviews.length > 0 ? (
            upcomingInterviews.map((job) => (
              <Pressable 
                key={job.id} 
                style={styles.jobItem}
                onPress={() => navigation.navigate('JobInfo', { job })}
              >
                <View style={styles.jobHeader}>
                  <Text style={styles.jobPosition}>{job.position}</Text>
                  <Text style={[styles.jobStatus, getStatusStyle(job.status)]}>{job.status}</Text>
                </View>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming interviews</Text>
          )}
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'BOOKMARKED':
      return styles.bookmarkedText;
    case 'APPLYING':
      return styles.applyingText;
    case 'APPLIED':
      return styles.appliedText;
    case 'INTERVIEWING':
      return styles.interviewingText;
    case 'NEGOTIATING':
      return styles.negotiatingText;
    case 'ACCEPTED':
      return styles.acceptedText;
    case 'DECLINED':
      return styles.declinedText;
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusPipeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statusItem: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  statusLabel: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  bookmarkedStatus: {
    backgroundColor: '#6c757d',
  },
  applyingStatus: {
    backgroundColor: '#fd7e14',
  },
  appliedStatus: {
    backgroundColor: '#007bff',
  },
  interviewingStatus: {
    backgroundColor: '#6f42c1',
  },
  negotiatingStatus: {
    backgroundColor: '#20c997',
  },
  acceptedStatus: {
    backgroundColor: '#28a745',
  },
  declinedStatus: {
    backgroundColor: '#dc3545',
  },
  bookmarkedText: {
    color: '#6c757d',
  },
  applyingText: {
    color: '#fd7e14',
  },
  appliedText: {
    color: '#007bff',
  },
  interviewingText: {
    color: '#6f42c1',
  },
  negotiatingText: {
    color: '#20c997',
  },
  acceptedText: {
    color: '#28a745',
  },
  declinedText: {
    color: '#dc3545',
  },
  jobItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobPosition: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  jobDate: {
    fontSize: 12,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    padding: 15,
    color: '#777',
  },
  seeAllButton: {
    backgroundColor: '#5637DD',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  seeAllText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;