import { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Avatar, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/LoadingComponent';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import * as Animatable from 'react-native-animatable';

const FavoritesScreen = ({ navigation }) => {
  const { jobsArray, isLoading, errMess } = useSelector((state) => state.jobs);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const renderFavoriteItem = ({ item: job }) => {
    return (
      <SwipeRow rightOpenValue={-100}>
        <View style={styles.deleteView}>
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() => 
              Alert.alert(
                'Remove Favorite',
                'Are you sure you wish to remove ' +
                  job.position +
                  ' at ' +
                  job.company +
                  ' from your favorites?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Not deleted'),
                    style: 'cancel'
                  },
                  {
                    text: 'OK',
                    onPress: () => dispatch(toggleFavorite(job.id))
                  }
                ],
                { cancelable: false }
              )
            }
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ListItem
            onPress={() => navigation.navigate('JobInfo', { job })}
          >
            <Avatar
              rounded
              title={job.company.charAt(0)}
              containerStyle={getStatusBackground(job.status)}
            />
            <ListItem.Content>
              <ListItem.Title>{job.position}</ListItem.Title>
              <ListItem.Subtitle>{job.company}</ListItem.Subtitle>
            </ListItem.Content>
            <View style={styles.statusBadge}>
              <Text style={[styles.statusText, getStatusStyle(job.status)]}>
                {job.status}
              </Text>
            </View>
          </ListItem>
        </View>
      </SwipeRow>
    );
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'BOOKMARKED':
        return { backgroundColor: '#6c757d' };
      case 'APPLYING':
        return { backgroundColor: '#fd7e14' };
      case 'APPLIED':
        return { backgroundColor: '#007bff' };
      case 'INTERVIEWING':
        return { backgroundColor: '#6f42c1' };
      case 'NEGOTIATING':
        return { backgroundColor: '#20c997' };
      case 'ACCEPTED':
        return { backgroundColor: '#28a745' };
      case 'DECLINED':
        return { backgroundColor: '#dc3545' };
      default:
        return { backgroundColor: '#6c757d' };
    }
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

  if (isLoading) {
    return <Loading />;
  }

  if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  }

  const favoriteJobs = jobsArray.filter((job) => favorites.includes(job.id));

  if (favoriteJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Animatable.Text 
          animation="fadeInDown"
          duration={2000}
          delay={1000}
          style={styles.emptyText}
        >
          You haven't favorited any jobs yet.
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          duration={2000}
          delay={2000}
          style={styles.emptySubText}
        >
          Mark jobs as favorites to easily track your top opportunities.
        </Animatable.Text>
      </View>
    );
  }

  return (
    <Animatable.View animation="fadeInRightBig" duration={2000}>
      <FlatList
        data={favoriteJobs}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  deleteView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: 'red',
    height: '100%',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
    width: 100,
  },
  statusBadge: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBookmarked: {
    color: '#6c757d',
  },
  statusApplying: {
    color: '#fd7e14',
  },
  statusApplied: {
    color: '#007bff',
  },
  statusInterviewing: {
    color: '#6f42c1',
  },
  statusNegotiating: {
    color: '#20c997',
  },
  statusAccepted: {
    color: '#28a745',
  },
  statusDeclined: {
    color: '#dc3545',
  },
});

export default FavoritesScreen;