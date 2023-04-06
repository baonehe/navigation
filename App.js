import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image, Alert,FlatList,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Anticon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const images = [
  { id: 1, image: require('./Image/car1.jpg') },
  { id: 2, image: require('./Image/car2.jpg') },
  { id: 3, image: require('./Image/car3.jpg') },
];
const ImageWithButton = ({ image,onPress,selected }) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Image source={image} style={{width:200,height:200,resizeMode:'contain'}} />
      <TouchableOpacity onPress={onPress} style={{alignSelf:'center',marginLeft:30}}>
       <Anticon name="heart" size={24}></Anticon>
       <Text >{selected ? 'Remove' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};
function HomeScreen() {
  const navigation=useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImagePress =async = (imageId) => {
    const index = selectedImages.findIndex((img) => img.id === imageId);
    if (index === -1) {
      // image is not in selectedImages array, add it
      const selectedImage = images.find((img) => img.id === imageId);
      setSelectedImages([...selectedImages, selectedImage]);
      console.log(selectedImages);
    } else {
      // image is already in selectedImages array, remove it
      const updatedSelectedImages = [...selectedImages];
      updatedSelectedImages.splice(index, 1);
      setSelectedImages(updatedSelectedImages);
    }
    
  };
  useEffect(() => {
    navigation.navigate('Favorite', { selectedImages });
  }, [selectedImages]);

  const renderImage = ({ item }) => {
    const selected = selectedImages.some((img) => img.id === item.id);
    return (
      <ImageWithButton
        image={item.image}
        name={item.name}
        onPress={() => handleImagePress(item.id)}
        selected={selected}
      />
    );
  };
  return (
    <View style={styles.container}>
  <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImage}
      />
    </View>
  
  );
}

function ProfileScreen({ route }) {
  const { selectedImages } = route.params;
  const [imagesList, setImagesList] = useState([]);

  useEffect(() => {
    setImagesList(selectedImages);
  }, [selectedImages]);
  const renderImage = ({ item }) => {
    return (
      <View>
      <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={item.image} />
      </View>

    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedImages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImage}
      />
    </View>
  );
}


function SettingsScreen() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.darkBackground]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Switch to {theme === "light" ? "dark" : "light"} mode</Text>
      </TouchableOpacity>
    </View>
  );
}
const homeName = "Home";
const detailsName = "Favorite";
const settingsName = "Settings";

export default function App() {

  return (
<NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen}  />
        <Tab.Screen name={detailsName} component={ProfileScreen}>
        </Tab.Screen>
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card:{
    flex: 1, 
    flexDirection: 'column',
    padding: 10,
    borderColor:'grey',
    borderRadius:10, 
    borderWidth:1,
    marginVertical:5,
    marginHorizontal:80,
    justifyContent:'center',
    alignItems:'center',},
    darkBackground: {
      backgroundColor: "#222222",
    },
    toggleButton: {
      backgroundColor: "#ffffff",
      padding: 10,
      borderRadius: 5,
    },
    toggleButtonText: {
      fontSize: 16,
      fontWeight: "bold",
    },
});
