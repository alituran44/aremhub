// 🟢 RESMİ SOSYAL MEDYA API DAĞITIM VE TOKEN DOĞRULAMA SERVİSİ (YOL B)
// Desteklenen Resmi API'ler: Meta Graph API v19.0 (Instagram Reels/Post & Facebook), Webhooks, LinkedIn

/**
 * 1. META GRAPH API (INSTAGRAM & FACEBOOK) TOKEN SAĞLIK TESTİ
 * Verilen Access Token ile Meta Graph API'ye sorgu atar, bağlı hesapları ve Instagram Business ID'yi çeker.
 */
export async function verifyMetaToken(accessToken) {
  if (!accessToken || !accessToken.trim()) {
    return { success: false, error: 'Erişim anahtarı (Access Token) boş olamaz.' };
  }

  try {
    const cleanToken = accessToken.trim();
    const url = `https://graph.facebook.com/v19.0/me?fields=id,name,accounts{id,name,category,access_token,instagram_business_account{id,username,name,profile_picture_url}}&access_token=${encodeURIComponent(cleanToken)}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message || 'Meta API yetkilendirme hatası',
        code: data.error.code,
        type: data.error.type
      };
    }

    // Başarılı Meta Yanıtı
    const pages = data.accounts?.data || [];
    const igAccounts = [];

    pages.forEach(p => {
      if (p.instagram_business_account) {
        igAccounts.push({
          pageId: p.id,
          pageName: p.name,
          pageAccessToken: p.access_token,
          igId: p.instagram_business_account.id,
          igUsername: p.instagram_business_account.username,
          igName: p.instagram_business_account.name,
          igProfilePic: p.instagram_business_account.profile_picture_url
        });
      }
    });

    return {
      success: true,
      userName: data.name,
      userId: data.id,
      pagesCount: pages.length,
      pages: pages.map(p => ({ id: p.id, name: p.name, category: p.category })),
      instagramAccounts: igAccounts,
      raw: data
    };
  } catch (err) {
    return {
      success: false,
      error: 'Ağ veya CORS bağlantı hatası: ' + (err.message || 'Bilinmeyen hata')
    };
  }
}

/**
 * 2. INSTAGRAM REELS / VİDEO YAYINLAMA (META GRAPH API v19.0)
 * Adım 1: Media Container oluştur (video_url, media_type=REELS, caption)
 * Adım 2: Container hazır olana kadar bekle (Status Code polling)
 * Adım 3: Media Container'ı yayına al (media_publish)
 */
export async function publishInstagramReels({ accessToken, igUserId, videoUrl, caption, shareToFeed = true }) {
  try {
    if (!accessToken || !igUserId || !videoUrl) {
      throw new Error('Eksik parametre: Access Token, Instagram ID veya Video URL bulunamadı.');
    }

    // Adım 1: Media Container Başlat
    const createContainerUrl = `https://graph.facebook.com/v19.0/${igUserId}/media`;
    const params = new URLSearchParams({
      media_type: 'REELS',
      video_url: videoUrl,
      caption: caption || '',
      share_to_feed: shareToFeed ? 'true' : 'false',
      access_token: accessToken
    });

    const createRes = await fetch(`${createContainerUrl}?${params.toString()}`, {
      method: 'POST'
    });
    const createData = await createRes.json();

    if (createData.error) {
      throw new Error(createData.error.message || 'Instagram video container oluşturulamadı.');
    }

    const creationId = createData.id;

    // Adım 2: Video İşleme Durumunu Bekle (Polling - max 30s)
    let isReady = false;
    let attempts = 0;
    while (!isReady && attempts < 10) {
      attempts++;
      await new Promise(r => setTimeout(r, 3000)); // 3 saniye bekle

      const statusRes = await fetch(`https://graph.facebook.com/v19.0/${creationId}?fields=status_code&access_token=${accessToken}`);
      const statusData = await statusRes.json();

      if (statusData.status_code === 'FINISHED') {
        isReady = true;
      } else if (statusData.status_code === 'ERROR') {
        throw new Error('Meta sunucusu videoyu işlerken hata verdi.');
      }
    }

    // Adım 3: Yayına Al (Publish)
    const publishUrl = `https://graph.facebook.com/v19.0/${igUserId}/media_publish`;
    const pubParams = new URLSearchParams({
      creation_id: creationId,
      access_token: accessToken
    });

    const pubRes = await fetch(`${publishUrl}?${pubParams.toString()}`, {
      method: 'POST'
    });
    const pubData = await pubRes.json();

    if (pubData.error) {
      throw new Error(pubData.error.message || 'Instagram yayına alma (publish) başarısız oldu.');
    }

    return {
      success: true,
      mediaId: pubData.id,
      creationId: creationId,
      platform: 'instagram_reels'
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      platform: 'instagram_reels'
    };
  }
}

/**
 * 3. INSTAGRAM STATİK FOTOĞRAF / GÖNDERİ YAYINLAMA
 */
export async function publishInstagramPhoto({ accessToken, igUserId, imageUrl, caption }) {
  try {
    if (!accessToken || !igUserId || !imageUrl) {
      throw new Error('Eksik parametre: Access Token, Instagram ID veya Görsel URL bulunamadı.');
    }

    // 1. Container Oluştur
    const createUrl = `https://graph.facebook.com/v19.0/${igUserId}/media`;
    const params = new URLSearchParams({
      image_url: imageUrl,
      caption: caption || '',
      access_token: accessToken
    });

    const createRes = await fetch(`${createUrl}?${params.toString()}`, { method: 'POST' });
    const createData = await createRes.json();

    if (createData.error) {
      throw new Error(createData.error.message || 'Görsel container oluşturulamadı.');
    }

    const creationId = createData.id;

    // 2. Yayına Al
    const pubUrl = `https://graph.facebook.com/v19.0/${igUserId}/media_publish`;
    const pubParams = new URLSearchParams({
      creation_id: creationId,
      access_token: accessToken
    });

    const pubRes = await fetch(`${pubUrl}?${pubParams.toString()}`, { method: 'POST' });
    const pubData = await pubRes.json();

    if (pubData.error) {
      throw new Error(pubData.error.message || 'Görsel yayına alınamadı.');
    }

    return {
      success: true,
      mediaId: pubData.id,
      creationId: creationId,
      platform: 'instagram_post'
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      platform: 'instagram_post'
    };
  }
}

/**
 * 4. FACEBOOK SAYFASINDA PAYLAŞIM YAPMA
 */
export async function publishFacebookPagePost({ pageAccessToken, pageId, message, mediaUrl, isVideo = false }) {
  try {
    if (!pageAccessToken || !pageId) {
      throw new Error('Facebook Sayfa ID veya Sayfa Token bulunamadı.');
    }

    let url = '';
    const bodyParams = new URLSearchParams({
      access_token: pageAccessToken
    });

    if (isVideo && mediaUrl) {
      url = `https://graph.facebook.com/v19.0/${pageId}/videos`;
      bodyParams.append('file_url', mediaUrl);
      bodyParams.append('description', message || '');
    } else if (mediaUrl) {
      url = `https://graph.facebook.com/v19.0/${pageId}/photos`;
      bodyParams.append('url', mediaUrl);
      bodyParams.append('message', message || '');
    } else {
      url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
      bodyParams.append('message', message || '');
    }

    const res = await fetch(`${url}?${bodyParams.toString()}`, { method: 'POST' });
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || 'Facebook paylaşımı başarısız oldu.');
    }

    return {
      success: true,
      postId: data.id || data.post_id,
      platform: 'facebook'
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      platform: 'facebook'
    };
  }
}

/**
 * 5. WEBHOOK İLE DOĞRUDAN DAĞITIM (Make / n8n / Zapier)
 */
export async function triggerSocialWebhook({ webhookUrl, payload }) {
  try {
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      throw new Error('Geçerli bir Webhook URL adresi girilmedi.');
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return {
      success: res.ok,
      status: res.status,
      statusText: res.statusText
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * 6. TÜM KANALLAR İÇİN MERKEZİ GÖNDERİ DAĞITICISI (MASTER DISPATCHER)
 */
export async function executeRealSocialPublish({
  postData,
  selectedChannels = [],
  brandCredentials = {},
  brandName = 'Detay Peyzaj'
}) {
  const results = [];

  for (const channel of selectedChannels) {
    const channelCreds = brandCredentials[channel] || {};

    // 🟢 INSTAGRAM
    if (channel === 'instagram') {
      if (channelCreds.accessToken && channelCreds.igUserId) {
        if (postData.type === 'reels' && postData.video) {
          const res = await publishInstagramReels({
            accessToken: channelCreds.accessToken,
            igUserId: channelCreds.igUserId,
            videoUrl: postData.video,
            caption: postData.content
          });
          results.push({ channel: 'instagram', ...res, mode: 'LIVE_META_GRAPH_API' });
        } else {
          const res = await publishInstagramPhoto({
            accessToken: channelCreds.accessToken,
            igUserId: channelCreds.igUserId,
            imageUrl: postData.image,
            caption: postData.content
          });
          results.push({ channel: 'instagram', ...res, mode: 'LIVE_META_GRAPH_API' });
        }
      } else {
        results.push({
          channel: 'instagram',
          success: true,
          mode: 'SIMULATION_READY',
          message: 'Meta API anahtarı girilmediği için yerel & Supabase üzerinde başarıyla kaydedildi. Canlı yayın için Entegrasyonlar sekmesinden Token girin.'
        });
      }
    }

    // 🟢 FACEBOOK
    else if (channel === 'facebook') {
      if (channelCreds.accessToken && channelCreds.pageId) {
        const res = await publishFacebookPagePost({
          pageAccessToken: channelCreds.accessToken,
          pageId: channelCreds.pageId,
          message: postData.content,
          mediaUrl: postData.video || postData.image,
          isVideo: postData.type === 'reels' || !!postData.video
        });
        results.push({ channel: 'facebook', ...res, mode: 'LIVE_META_GRAPH_API' });
      } else {
        results.push({
          channel: 'facebook',
          success: true,
          mode: 'SIMULATION_READY',
          message: 'Facebook Sayfa Token girilmediği için yerel & Supabase üzerinde kaydedildi.'
        });
      }
    }

    // 🟢 WEBHOOK / DİĞERLERİ
    else if (channelCreds.webhookUrl) {
      const res = await triggerSocialWebhook({
        webhookUrl: channelCreds.webhookUrl,
        payload: {
          platform: channel,
          brand: brandName,
          post: postData,
          timestamp: new Date().toISOString()
        }
      });
      results.push({ channel, ...res, mode: 'LIVE_WEBHOOK' });
    } else {
      results.push({
        channel,
        success: true,
        mode: 'SIMULATION_READY',
        message: `${channel} API anahtarı tanımlanmadığı için sistemde simüle edildi.`
      });
    }
  }

  return results;
}
