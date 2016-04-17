/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var RandManager = require('./RandManager.js');
var Swiper = require('react-native-swiper');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS 
} from 'react-native';

const NUM_WALLPAPERS = 5;

class SplashWalls extends Component {
  render() {
    var {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else
      return this.renderResults();
  }

  renderLoadingMessage() {
    return (    
    <View style={styles.loadingContainer}>
          <ActivityIndicatorIOS
            animating={true}
            color={'#fff'}
            size={'small'} 
            style={{margin: 15}} />
         <Text style={{color: '#fff'}}>Contacting Unsplash</Text>
     </View>
    );
  }

  renderResults() {
    var {wallsJSON, isLoading} = this.state;
    if( !isLoading ) {
      return (
        
    <Swiper
dot={<View style={{backgroundColor:'rgba(0,0,0,.4)', width: 8, height: 8,borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}

activeDot={<View style={{backgroundColor: '#000', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
    loop={false}

    onMomentumScrollEnd={this.onMomentumScrollEnd}
    >

          {wallsJSON.map((wallpaper, index) => {
            return(
              <Text key={index}>
                Wallpaper author: {wallpaper.author}
              </Text>
            );
          })}
         
     </Swiper>
      );
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      wallsJSON: [],
      isLoading: true,
    };
  }

fetchWallsJSON() {
  var url = 'http://unsplash.it/list';
  fetch(url)
    .then( response => response.json() )
    .then( jsonData => {

      var randomIds = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length);
      var walls = [];
      randomIds.forEach(randomId => {
        walls.push(jsonData[randomId]);
      });

      this.setState({
        isLoading: false,
        wallsJSON: [].concat(walls)
      });

    })
    .catch( error => console.log('JSON Fetch error : ' + error) );
}

  componentDidMount() {
    this.fetchWallsJSON();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loadingContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

AppRegistry.registerComponent('SplashWalls', () => SplashWalls);
