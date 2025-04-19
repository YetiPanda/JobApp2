import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

const RenderJob = (props) => {
  const { job } = props;
  
  if (job) {
    return (
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.position}>{job.position}</Text>
          <Text style={styles.company}>{job.company}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location: </Text>
            {job.location}
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.detailLabel}>Salary: </Text>
            {job.salary}
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status: </Text>
            <Text style={getStatusStyle(job.status)}>{job.status}</Text>
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date Applied: </Text>
            {job.dateApplied}
          </Text>
          
          {job.notes && (
            <Text style={styles.notes}>
              <Text style={styles.detailLabel}>Notes: </Text>
              {job.notes}
            </Text>
          )}
        </View>
        
        <View style={styles.cardRow}>
          <Icon
            name={props.isFavorite ? "star" : "star-o"}
            type="font-awesome"
            color="#f50"
            raised
            reverse
            onPress={() =>
              props.isFavorite
                ? console.log("Already set as a favorite")
                : props.markFavorite()
            }
          />
          <Icon
            name="edit"
            type="font-awesome"
            color="#5637DD"
            raised
            reverse
            onPress={() => props.onShowModal()}
          />
        </View>
      </Card>
    );
  }
  return <View />;
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'BOOKMARKED':
      return styles.statusBookmarked;
    case 'APPLYING':
      return styles.statusApplying;
    case 'APPLIED':
      return styles.statusApplied;
    case 'INTERVIEWING':
      return styles.statusInterviewing;
    case 'NEGOTIATING':
      return styles.statusNegotiating;
    case 'ACCEPTED':
      return styles.statusAccepted;
    case 'DECLINED':
      return styles.statusDeclined;
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: '#495057',
  },
  detailsContainer: {
    padding: 15,
  },
  detailItem: {
    marginBottom: 8,
    fontSize: 15,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#495057',
  },
  notes: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  statusBookmarked: {
    color: '#6c757d',
    fontWeight: 'bold',
  },
  statusApplying: {
    color: '#fd7e14',
    fontWeight: 'bold',
  },
  statusApplied: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  statusInterviewing: {
    color: '#6f42c1',
    fontWeight: 'bold',
  },
  statusNegotiating: {
    color: '#20c997',
    fontWeight: 'bold',
  },
  statusAccepted: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  statusDeclined: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
});

export default RenderJob;