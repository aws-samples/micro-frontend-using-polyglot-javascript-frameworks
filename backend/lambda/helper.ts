export  function getChartsDataQuery(userId: String): any{
    return {
      TableName: process.env.TABLE_NAME || 'charts',
      Key: {userId: userId}
    }
}
  
export function updateChartsDataQuery(chartsData: any): any{
    return {
      TableName: process.env.TABLE_NAME || 'charts',
      Key: {userId: chartsData.userId},
      UpdateExpression: `set mobilePhones = :mobilePhones , 
        cameras = :cameras , laptops = :laptops , 
        chairs = :chairs , tables = :tables , 
        wardrobes = :wardrobes , jeans = :jeans , 
        shirts = :shirts , shoes = :shoes`,
      ExpressionAttributeValues: {
        ":mobilePhones": chartsData.mobilePhones,
        ":cameras": chartsData.cameras,
        ":laptops": chartsData.laptops,
        ":chairs": chartsData.chairs,
        ":tables": chartsData.tables,
        ":wardrobes": chartsData.wardrobes,
        ":jeans": chartsData.jeans,
        ":shirts": chartsData.shirts,
        ":shoes": chartsData.shoes,
      }
    }
}