import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import ImagePicker from 'react-native-image-picker';
import {
  CustomHeader as Header,
  DropdownInput,
  CustomTextInput,
  CustomMultiLineInput,
  CustomAddInput,
  CustomAddPicture,
  CustomShowImage,
} from '../custom/component';
import {useFormInput} from '../custom/hooks';
import {Chip} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {navContext} from '../navigator/AppNavigator';
import Dialog, {
  DialogContent,
  DialogButton,
  DialogFooter,
} from 'react-native-popup-dialog';

function Posting(props) {
  // const {navigation} = props;
  const {navState, handler: navHandler} = useContext(navContext);
  const [formState, formhandler] = useFormInput();
  const categoryList = useSelector(state => state.categories);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const refForm = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [post, setPost] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      padding: responsiveHeight(2),
    },
    headerfont: {
      fontSize: responsiveFontSize(3),
      fontWeight: 'bold',
      color: '#FFF',
    },
  });

  useEffect(() => {
    const {availableRoutes, activeIndex} = navState;
    if (availableRoutes[activeIndex].value === 'posting') {
      formhandler.resetForm();
    }
  }, [navState.activeIndex]);

  useEffect(() => {
    if (post) {
      dispatch({type: 'ADD_POST', payload: post});
      formhandler.resetForm();
      setPhotos([]);
      navHandler.navigate('Home');
    }
  }, [post]);

  return (
    <>
      <Header>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: responsiveWidth(3),
            top: responsiveHeight(4),
          }}
          onPress={() => {
            if (formhandler.checkInput() === true) {
              formhandler.setFieldTouched(photos, 'images');
              setPost({
                id: formState.title,
                title: formState.title,
                user_id: user.id,
                images: photos,
                description: formState.description,
                categories: formState.categories.map(c => c.value),
                groups: formState.groups.map(g => g.value),
                product: formState.product.map(p => p.value),
                stashes: formState.stashes.map(s => s.value),
              });
            } else {
              setOpenDialog(true);
            }
          }}>
          <Text style={styles.headerfont}>Post</Text>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerfont}>Create Post</Text>
        </View>
      </Header>
      <View>
        <View style={{flexDirection: 'row'}}>
          <CustomAddPicture setMedia={setPhotos} />
          {photos.map(p => (
            <CustomShowImage source={p} />
          ))}
        </View>
        <CustomTextInput
          onChange={e =>
            formhandler.setFieldTouched(e.nativeEvent.text, 'title')
          }
          value={formState.title}
          placeholder={'Title'}
        />
        <CustomMultiLineInput
          onChange={e =>
            formhandler.setFieldTouched(e.nativeEvent.text, 'description')
          }
          value={formState.description}
          placeholder={'Description'}
        />
        <CustomAddInput
          onPress={e => formhandler.addFieldTouched('', 'categories')}
          placeholder={'Select Category'}>
          <FlatList
            key={123}
            style={{flexDirection: 'row', padding: responsiveHeight(1)}}
            numColumns={4}
            data={formState.categories}
            renderItem={({item}) => (
              <View style={{paddingRight: responsiveWidth(1)}}>
                <DropdownInput
                  onValueChange={value =>
                    formhandler.setMultiFieldTouched(
                      value,
                      'categories',
                      item.key,
                    )
                  }
                  items={categoryList}
                />
              </View>
            )}
          />
        </CustomAddInput>
        <CustomAddInput
          onPress={e =>
            formhandler.addFieldTouched(
              `Product - ${formState.product.length}`,
              'product',
            )
          }
          placeholder={'Product'}>
          <FlatList
            style={{flexDirection: 'row'}}
            numColumns={4}
            data={formState.product}
            renderItem={({item}) => (
              <View style={{padding: responsiveHeight(1)}}>
                <TouchableOpacity>
                  <Chip mode="outlined">{item.value}</Chip>
                </TouchableOpacity>
              </View>
            )}
          />
        </CustomAddInput>
        <CustomAddInput
          onPress={e =>
            formhandler.addFieldTouched(
              `Group - ${formState.groups.length}`,
              'groups',
            )
          }
          placeholder={'Groups'}>
          <FlatList
            style={{flexDirection: 'row'}}
            numColumns={4}
            data={formState.groups}
            renderItem={({item}) => (
              <View style={{padding: responsiveHeight(1)}}>
                <TouchableOpacity>
                  <Chip
                    mode="outlined"
                    style={{maxWidth: responsiveWidth(20), overflow: 'hidden'}}>
                    {item.value}
                  </Chip>
                </TouchableOpacity>
              </View>
            )}
          />
        </CustomAddInput>
        <CustomAddInput
          onPress={e =>
            formhandler.addFieldTouched(
              `Stashes - ${formState.stashes.length}`,
              'stashes',
            )
          }
          placeholder={'Stashes'}>
          <FlatList
            style={{flexDirection: 'row'}}
            numColumns={4}
            data={formState.stashes}
            renderItem={({item}) => (
              <View style={{padding: responsiveHeight(1)}}>
                <TouchableOpacity>
                  <Chip
                    mode="outlined"
                    style={{maxWidth: responsiveWidth(20), overflow: 'hidden'}}>
                    {item.value}
                  </Chip>
                </TouchableOpacity>
              </View>
            )}
          />
        </CustomAddInput>
        <Dialog
          visible={openDialog}
          onTouchOutside={() => setOpenDialog(false)}>
          <DialogContent style={{paddingTop: responsiveHeight(3)}}>
            <Text style={{fontSize: responsiveFontSize(2)}}>
              Please fill in the required title
            </Text>
          </DialogContent>
          <DialogFooter
            style={{flexDirection: 'row-reverse', padding: responsiveWidth(3)}}>
            <TouchableOpacity onPress={() => setOpenDialog(false)}>
              <Text style={{color: '#DF99FF'}}>Okay</Text>
            </TouchableOpacity>
          </DialogFooter>
        </Dialog>
        {/* <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        categories: '',
                        product: '',
                        groups: '',
                        stashes: ''
                    }}
                    validationSchema={yup.object().shape({
                        title: yup.string().required('Please fill in your title.'),
                        description: yup.string().required('Please fill in your description.'),
                        categories: yup.string().required('Please select one of the categories.'),
                        product: yup.string().required('Please select a product.'),
                        groups: yup.string().required('Please select a group'),
                        stashes: yup.string().required('Please select your stash.')
                    })}
                    onSubmit={values => console.log(values)}
                    onSubmitWithErrors={(values, bug) => {
                        if (bug.errors) {
                            console.log(bug.errors)
                        } else {
                            // send values to server
                        }
                    }}
                >
                    {({ values, setFieldTouched, handleChange, touched, errors, handleSubmit }) => (
                        <>
                            {refForm.current = handleSubmit}
                            <TextInput
                                value={values.title}
                                onChangeText={handleChange('title')}
                                onBlur={() => setFieldTouched('title')}
                                placeholder="Title"
                            />
                            {touched.title && errors.title &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.title}</Text>
                            }
                            <TextInput
                                value={values.description}
                                onChangeText={handleChange('description')}
                                placeholder="Description"
                                onBlur={() => setFieldTouched('description')}
                            />
                            {touched.description && errors.description &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                            }
                            <TextInput
                                value={values.categories}
                                onChangeText={handleChange('categories')}
                                placeholder="Categories"
                                onBlur={() => setFieldTouched('categories')}
                            />
                            {touched.categories && errors.categories &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.categories}</Text>
                            }
                            <TextInput
                                value={values.product}
                                onChangeText={handleChange('product')}
                                placeholder="Product"
                                onBlur={() => setFieldTouched('product')}
                            />
                            {touched.product && errors.product &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.product}</Text>
                            }
                            <TextInput
                                value={values.groups}
                                onChangeText={handleChange('groups')}
                                placeholder="Groups"
                                onBlur={() => setFieldTouched('groups')}
                            />
                            {touched.groups && errors.groups &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.groups}</Text>
                            }
                            <TextInput
                                value={values.stashes}
                                onChangeText={handleChange('stashes')}
                                placeholder="Stashes"
                                onBlur={() => setFieldTouched('stashes')}
                            />
                            {touched.stashes && errors.stashes &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.stashes}</Text>
                            }
                        </>
                    )}
                </Formik> */}
      </View>
    </>
  );
}

export default React.memo(Posting);
