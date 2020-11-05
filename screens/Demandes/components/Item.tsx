import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, ImageComponent } from '../../sharedComponents';
import { formatDate } from '../../../utils';
import { theme } from '../../../constants';

interface ItemProps {
  name: string;
  messageText?: string;
  address?: string;
  queryDetail?: boolean;
  messageDate: string;
  image: string | null | undefined;
}
const Item = ({
  name,
  messageText,
  messageDate,
  image,
  queryDetail,
  address
}: ItemProps) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.item, queryDetail && { borderBottomColor: '#fff' }]}
        onPress={() => {}}>
        <View style={{ flex: 0.22 }}>
          <TouchableOpacity
            style={{
              width: theme.sizes.twiceTen * 3.5,
              height: theme.sizes.htwiceTen * 3.5,
              borderRadius: theme.sizes.radius * 6,
              overflow: 'hidden',
              margin: 'auto'
            }}>
            <ImageComponent image={image} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.78,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: theme.sizes.inouting / 5
          }}>
          <View style={{ flex: 0.85 }}>
            <View style={styles.secondBlock}>
              <View>
                <Text h2>{name}</Text>
              </View>
              <View>
                {!queryDetail ? (
                  <Text medium gray2={false} numberOfLines={1}>
                    {messageText}
                  </Text>
                ) : (
                  <Text medium gray2={false}>
                    {address}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.15,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View style={styles.thirdBlock}>
              <View>
                <Text center caption>
                  {formatDate(messageDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.sizes.inouting * 0.6,
    paddingVertical: theme.sizes.hinouting * 0.6,
    marginVertical: 0,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: theme.sizes.screenWidth,
    height: theme.sizes.htwiceTen * 5
  },
  secondBlock: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    textAlignVertical: 'bottom',
    height: theme.sizes.htwiceTen * 3.5,
    paddingVertical: theme.sizes.hinouting * 0.3
  },
  thirdBlock: {
    justifyContent: 'space-between',
    textAlignVertical: 'bottom',
    height: theme.sizes.htwiceTen * 3.5,
    paddingVertical: theme.sizes.hinouting * 0.3,
    alignItems: 'center'
  }
});

export default Item;
