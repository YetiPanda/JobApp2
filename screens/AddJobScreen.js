import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Button, Alert } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { addJob } from '../features/jobs/jobsSlice';
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native';

const AddJobScreen = ({ navigation }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('BOOKMARKED');
  const [notes, setNotes] = useState('');
  const [interest, setInterest] = useState(3);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const statuses = [
    'BOOKMARKED',
    'APPLYING',
    'APPLIED',
    'INTERVIEWING',
    'NEGOTIATING',
    'ACCEPTED',
    'DECLINED'
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleReset = () => {
    setPosition('');
    setCompany('');
    setLocation('');
    setSalary('');
    setStatus('BOOKMARKED');
    setNotes('');
    setInterest(3);
    setDate(new Date());
  };

  const handleSubmit = () => {
    if (!position) {
      Alert.alert('Error', 'Please enter a job position');
      return;
    }
    if (!company) {
      Alert.alert('Error', 'Please enter a company name');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];

    const newJob = {
      position,
      company,
      location: location || 'Remote',
      salary: salary || 'Not specified',
      status,
      notes,
      interest,
      dateApplied: formattedDate,
      interview: 'N/A',
      followUp: 'N/A'
    };

    dispatch(addJob(newJob));
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    handleReset();
    navigation.navigate('Directory');
  };

  return (
    <ScrollView style={styles.container}>
      <Animatable.View
        animation='fadeInDown'
        duration={1000}
        delay={500}
      >
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Job Title: *</Text>
          <Input
            placeholder='Job Title'
            leftIcon={{ type: 'font-awesome', name: 'briefcase', size: 20, color: '#5637DD' }}
            leftIconContainerStyle={styles.iconStyle}
            onChangeText={(text) => setPosition(text)}
            value={position}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Company: *</Text>
          <Input
            placeholder='Company Name'
            leftIcon={{ type: 'font-awesome', name: 'building', size: 20, color: '#5637DD' }}
            leftIconContainerStyle={styles.iconStyle}
            onChangeText={(text) => setCompany(text)}
            value={company}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Location:</Text>
          <Input
            placeholder='Location (e.g. Remote, New York, NY)'
            leftIcon={{ type: 'font-awesome', name: 'map-marker', size: 24, color: '#5637DD' }}
            leftIconContainerStyle={styles.iconStyle}
            onChangeText={(text) => setLocation(text)}
            value={location}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Salary:</Text>
          <Input
            placeholder='Expected Salary (e.g. $80,000)'
            leftIcon={{ type: 'font-awesome', name: 'dollar', size: 18, color: '#5637DD' }}
            leftIconContainerStyle={styles.iconStyle}
            onChangeText={(text) => setSalary(text)}
            value={salary}
            keyboardType='numbers-and-punctuation'
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Application Status:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={styles.formPicker}
            >
              {statuses.map((status) => (
                <Picker.Item key={status} label={status} value={status} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date Applied:</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-US')}
            </Text>
            <Button
              onPress={() => setShowDatePicker(true)}
              title='Select Date'
              color='#5637DD'
            />
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode='date'
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              style={styles.formDate}
            />
          )}
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Interest Level (1-5):</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={[
                  styles.starText,
                  { color: star <= interest ? '#FFD700' : '#e4e5e9' }
                ]}
                onPress={() => setInterest(star)}
              >
                ★
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Notes:</Text>
          <Input
            placeholder='Add any notes about the position'
            multiline
            numberOfLines={5}
            onChangeText={(text) => setNotes(text)}
            value={notes}
            style={styles.formMultiline}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.requiredText}>* Required fields</Text>
        </View>

        <View style={styles.formRow}>
          <Button
            title='Submit'
            color='#5637DD'
            onPress={() => handleSubmit()}
            accessibilityLabel='Tap me to submit job application details'
          />
        </View>

        <View style={styles.formRow}>
          <Button
            title='Reset'
            color='#808080'
            onPress={() => handleReset()}
            accessibilityLabel='Tap me to reset the form'
          />
        </View>
      </Animatable.View>

      <Modal
        animationType='slide'
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Job Application Added!</Text>
          <Button
            title='OK'
            color='#5637DD'
            onPress={() => resetForm()}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  formPicker: {
    width: '100%',
    height: 50,
  },
  pickerContainer: {
    width: '100%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
  },
  formDate: {
    flex: 2,
    marginRight: 20,
    marginLeft: 10,
    marginBottom: 0,
    padding: 10,
  },
  formMultiline: {
    textAlignVertical: 'top',
    height: 100,
  },
  iconStyle: {
    marginRight: 10,
    marginLeft: 0,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#5637DD',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    padding: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  starText: {
    fontSize: 40,
    paddingHorizontal: 5,
  },
  requiredText: {
    fontSize: 12,
    color: '#6c757d',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default AddJobScreen;