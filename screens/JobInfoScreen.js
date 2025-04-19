import { Button, Modal, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { Input, Rating } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import RenderJob from "../features/jobs/RenderJob";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { updateJob } from "../features/jobs/jobsSlice";
import { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-picker/picker";

const JobInfoScreen = ({ route }) => {
  const { job } = route.params;
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState(job.notes || "");
  const [interest, setInterest] = useState(job.interest || 1);
  const [status, setStatus] = useState(job.status);

  const handleSubmit = () => {
    const updatedJob = {
      ...job,
      notes,
      interest,
      status
    };
    dispatch(updateJob(updatedJob));
    setShowModal(!showModal);
  };

  const resetForm = () => {
    setNotes(job.notes || "");
    setInterest(job.interest || 1);
    setStatus(job.status);
  };

  const statuses = [
    "BOOKMARKED", 
    "APPLYING", 
    "APPLIED", 
    "INTERVIEWING", 
    "NEGOTIATING", 
    "ACCEPTED", 
    "DECLINED"
  ];

  return (
    <ScrollView>
      <Animatable.View animation="fadeIn" duration={2000} delay={1000}>
        <RenderJob
          job={job}
          isFavorite={favorites.includes(job.id)}
          markFavorite={() => dispatch(toggleFavorite(job.id))}
          onShowModal={() => setShowModal(!showModal)}
        />
      </Animatable.View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Update Job Status</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Interest Level:</Text>
            <Rating
              showRating
              startingValue={interest}
              imageSize={30}
              onFinishRating={(rating) => setInterest(rating)}
              style={{ paddingVertical: 10 }}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Status:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
              >
                {statuses.map((statusOption) => (
                  <Picker.Item 
                    key={statusOption} 
                    label={statusOption} 
                    value={statusOption} 
                  />
                ))}
              </Picker>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Notes:</Text>
            <Input
              placeholder="Add notes about this job"
              multiline
              numberOfLines={5}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => setNotes(text)}
              value={notes}
              style={styles.textArea}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                handleSubmit();
              }}
              color="#5637DD"
              title="Update"
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#5637DD",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default JobInfoScreen;