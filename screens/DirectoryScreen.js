import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";

const DirectoryScreen = ({ navigation, route }) => {
  const jobs = useSelector((state) => state.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  // Check if a status filter was passed from the navigation
  useEffect(() => {
    if (route.params?.statusFilter) {
      const filtered = jobs.jobsArray.filter(
        job => job.status === route.params.statusFilter
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs.jobsArray);
    }
  }, [route.params?.statusFilter, jobs.jobsArray]);

  if (jobs.isLoading) {
    return <Loading />;
  }
  if (jobs.errMess) {
    return (
      <View>
        <Text>{jobs.errMess}</Text>
      </View>
    );
  }

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'BOOKMARKED':
        return styles.badgeBookmarked;
      case 'APPLYING':
        return styles.badgeApplying;
      case 'APPLIED':
        return styles.badgeApplied;
      case 'INTERVIEWING':
        return styles.badgeInterviewing;
      case 'NEGOTIATING':
        return styles.badgeNegotiating;
      case 'ACCEPTED':
        return styles.badgeAccepted;
      case 'DECLINED':
        return styles.badgeDeclined;
      default:
        return styles.badgeBookmarked;
    }
  };

  const renderStars = (interest) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={i <= interest ? styles.starFilled : styles.starEmpty}>
          ★
        </Text>
      );
    }
    return (
      <View style={styles.starsContainer}>
        {stars}
      </View>
    );
  };

  const renderDirectoryItem = ({ item: job }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("JobInfo", { job })}>
        <View style={styles.itemContainer}>
          <View style={styles.jobInfoContainer}>
            <Text style={styles.positionText}>{job.position}</Text>
            <Text style={styles.companyText}>{job.company}</Text>
            <Text style={styles.locationText}>{job.location}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.salaryText}>{job.salary}</Text>
              <Badge
                value={job.status}
                badgeStyle={getStatusBadgeStyle(job.status)}
                textStyle={styles.badgeText}
              />
            </View>
          </View>
          <View style={styles.ratingContainer}>
            {renderStars(job.interest)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Display a message if no jobs match the filter
  if (filteredJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {route.params?.statusFilter 
            ? `No jobs with status "${route.params.statusFilter}" found.` 
            : "No jobs found."}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredJobs}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
  },
  jobInfoContainer: {
    flex: 1,
  },
  ratingContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  positionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starFilled: {
    color: '#FFD700',
    fontSize: 16,
  },
  starEmpty: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  badgeBookmarked: {
    backgroundColor: '#6c757d',
  },
  badgeApplying: {
    backgroundColor: '#fd7e14',
  },
  badgeApplied: {
    backgroundColor: '#007bff',
  },
  badgeInterviewing: {
    backgroundColor: '#6f42c1',
  },
  badgeNegotiating: {
    backgroundColor: '#20c997',
  },
  badgeAccepted: {
    backgroundColor: '#28a745',
  },
  badgeDeclined: {
    backgroundColor: '#dc3545',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default DirectoryScreen;