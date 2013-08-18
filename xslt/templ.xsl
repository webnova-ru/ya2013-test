<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method = "html"
            media-type = "text/html"
            encoding = "utf-8"
            doctype-public = "html" />
    <xsl:template match="page">
        <!--[if lt IE 7]>      <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
        <!--[if IE 7]>         <html class="lt-ie9 lt-ie8"> <![endif]-->
        <!--[if IE 8]>         <html class="lt-ie9"> <![endif]-->
        <!--[if gt IE 8]><!--> <html> <!--<![endif]-->
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="viewport" content="width=device-width" />

            <xsl:apply-templates select="assets"/>
            <xsl:apply-templates select="seo_info"/>
        </head>
        <body>
            <xsl:apply-templates select="page_code/header" />
            <xsl:apply-templates select="page_code/content"/>
            <xsl:apply-templates select="page_code/footer"/>
        </body>
        </html>
    </xsl:template>

    <xsl:template match="assets">
        <xsl:apply-templates select="icons/link" />
        <xsl:apply-templates select="css/link" />
        <xsl:apply-templates select="js/link" />
    </xsl:template>

    <xsl:template match="icons/link">
        <link type="image/x-icon" rel="shortcut icon">
            <xsl:attribute name = "href">
                <xsl:value-of select = "." />
            </xsl:attribute>
        </link>
    </xsl:template>

    <xsl:template match="css/link">
        <link rel="stylesheet">
            <xsl:attribute name = "href">
                <xsl:value-of select = "."/>
            </xsl:attribute>
        </link>
    </xsl:template>

    <xsl:template match="js/link">
        <script>
            <xsl:attribute name = "src">
                <xsl:value-of select = "."/>
            </xsl:attribute>
        </script>
    </xsl:template>

    <xsl:template match="seo_info">
        <meta name="description">
            <xsl:attribute name = "content">
                <xsl:value-of select = "descr"/>
            </xsl:attribute>
        </meta>
        <meta name="keywords">
            <xsl:attribute name = "content">
                <xsl:value-of select = "kw"/>
            </xsl:attribute>
        </meta>
        <title><xsl:value-of select="title"/></title>
    </xsl:template>

    <xsl:template match="page_code/header">
        <header class="header">
            <div class="header_content">
                <div class="-row">
                    <div class="-unit">
                        <div class="header_content_logo"><xsl:value-of select="logo_text"/></div>
                    </div>
                    <div class="-unit">
                        <h1 class="header_content_title"><xsl:value-of select="logo_descr"/></h1>
                    </div>
                </div>
            </div>
        </header>
    </xsl:template>

    <xsl:template match="page_code/content">
        <div class="content">
            <div class="content_left">
                <div class="form-progress">
                <div class="form-process_title">
                    <span class="form-process_title_note -toolTip" data-note="Индикатор заполнения формы" >?</span>
                </div>
                    <ul class="form-progress_list">
                        <xsl:call-template name="progress_bar">
                            <xsl:with-param name="i" select="1" />
                            <xsl:with-param name="qCount" select="15" />
                        </xsl:call-template>
                    </ul>
                </div>
            </div>

            <div class="content_right">
                <form id="js-form" action="#" method="post" enctype="multipart/form-data" data-validate="formNova">
                    <h2 class="form-title"><xsl:value-of select="form/form_questions/title"/></h2>
                    <xsl:apply-templates select="form/form_questions/question" />
                    <xsl:apply-templates select="form/form_userInfo" />

                    <div class="-form-line -form-action">
                        <div class="-form-right">
                            <button class="-button" type="submit">Отправить</button>
                            <button id="js-reset-form" class="-button -button--gray -k-spacer_l" type="reset">Очистить</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </xsl:template>

    <xsl:template match="form/form_userInfo">
        <h2 class="form-title"><xsl:value-of select="title"/></h2>
        <xsl:apply-templates select="file" />
        <div class="-form-line">
            <label class="-label -form-left">
                <xsl:attribute name="for"><xsl:value-of select="inputs/MK/@name"/></xsl:attribute>
                <xsl:value-of select="inputs/MK/label"/>
            </label>
            <div class="-form-right">
                <input class="-input-text -width-100" type="text">
                    <xsl:attribute name="id"><xsl:value-of select="inputs/MK/@name"/></xsl:attribute>
                    <xsl:attribute name="name"><xsl:value-of select="inputs/MK/@name"/></xsl:attribute>
                    <xsl:attribute name="data-validRules"><xsl:value-of select="inputs/MK/validRules"/></xsl:attribute>
                </input>
            </div>
        </div>
        <div class="-form-line">
            <div class="-label -form-left -label--spacer">Имя, Фамилия</div>
            <div class="-form-right">
                <div class="-row">
                    <div class="-unit1of2">
                        <label class="-label">
                            <xsl:attribute name="for"><xsl:value-of select="inputs/firstName/@name"/></xsl:attribute>
                            <xsl:value-of select="inputs/firstName/label"/>
                        </label>
                        <input class="-input-text -width-100" type="text">
                            <xsl:attribute name="id"><xsl:value-of select="inputs/firstName/@name"/></xsl:attribute>
                            <xsl:attribute name="name"><xsl:value-of select="inputs/firstName/@name"/></xsl:attribute>
                            <xsl:attribute name="data-validRules"><xsl:value-of select="inputs/firstName/validRules"/></xsl:attribute>
                        </input>
                    </div>
                    <div class="-unit1of2">
                        <label class="-label">
                            <xsl:attribute name="for"><xsl:value-of select="inputs/lastName/@name"/></xsl:attribute>
                            <xsl:value-of select="inputs/lastName/label"/>
                        </label>
                        <input class="-input-text -width-100" type="text">
                            <xsl:attribute name="id"><xsl:value-of select="inputs/lastName/@name"/></xsl:attribute>
                            <xsl:attribute name="name"><xsl:value-of select="inputs/lastName/@name"/></xsl:attribute>
                            <xsl:attribute name="data-validRules"><xsl:value-of select="inputs/lastName/validRules"/></xsl:attribute>
                        </input>
                    </div>
                </div>
            </div>
        </div>
        <div class="-form-line">
            <label class="-label -form-left">
                <xsl:attribute name="for"><xsl:value-of select="inputs/Phone/@name"/></xsl:attribute>
                <xsl:value-of select="inputs/Phone/label"/>
            </label>
            <div class="-form-right">
                <span class="-ui-group">
                    <span class="-ui-group_item -mark">+7 (</span>
                    <input class="-ui-group_item -input-text -letter4" type="text">
                        <xsl:attribute name="id"><xsl:value-of select="inputs/CityCode/@name"/></xsl:attribute>
                        <xsl:attribute name="name"><xsl:value-of select="inputs/CityCode/@name"/></xsl:attribute>
                        <xsl:attribute name="data-validRules"><xsl:value-of select="inputs/CityCode/validRules"/></xsl:attribute>
                    </input>
                    <span class="-ui-group_item -mark">)</span>
                    <input class="-ui-group_item -input-text -letter10" type="text">
                        <xsl:attribute name="id"><xsl:value-of select="inputs/Phone/@name"/></xsl:attribute>
                        <xsl:attribute name="name"><xsl:value-of select="inputs/Phone/@name"/></xsl:attribute>
                        <xsl:attribute name="data-validRules"><xsl:value-of select="inputs/Phone/validRules"/></xsl:attribute>
                    </input>
                </span>
                <span class="-form-note">укажите код города</span>
            </div>
        </div>
        <div class="-form-line">
            <label class="-label -form-left">
                <xsl:attribute name="for"><xsl:value-of select="inputs/Email/@name"/></xsl:attribute>
                <strong><xsl:value-of select="inputs/Email/label"/></strong>
            </label>
            <div class="-form-right">
                <input class="-input-text -width-100" type="text" data-validRules="required|validEmail">
                    <xsl:attribute name="id"><xsl:value-of select="inputs/Email/@name"/></xsl:attribute>
                    <xsl:attribute name="name"><xsl:value-of select="inputs/Email/@name"/></xsl:attribute>
                    <xsl:attribute name="data-validRules"><xsl:value-of select="inputs/Email/validRules"/></xsl:attribute>
                </input>
            </div>
        </div>
        <div class="-form-line">
            <label class="-label -form-left">
                <xsl:attribute name="for">
                    <xsl:value-of select="textarea/@name"/>
                </xsl:attribute>
                <xsl:value-of select="textarea/label"/>
            </label>
            <div class="-form-right">
                <textarea class="-textarea -width-100 -k-spacer">
                    <xsl:attribute name="id">
                        <xsl:value-of select="textarea/@name"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="textarea/@name"/>
                    </xsl:attribute>
                </textarea>
                <xsl:apply-templates select="select" />
                <xsl:apply-templates select="checkbox" />
            </div>
        </div>
    </xsl:template>

    <xsl:template match="select">
        <label class="-label -width-100">
            <xsl:attribute name="for"><xsl:value-of select="@name"/></xsl:attribute>
            <xsl:value-of select="label"/>
        </label>
        <select class="js-select -select">
            <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
            <xsl:attribute name="id"><xsl:value-of select="@name"/></xsl:attribute>
            <xsl:attribute name="data-validRules"><xsl:value-of select="validRules"/></xsl:attribute>
            <xsl:for-each select="item">
                <option>
                    <xsl:attribute name="value"><xsl:value-of select="@val"/></xsl:attribute>
                    <xsl:value-of select="."/>
                </option>
            </xsl:for-each>
        </select>
    </xsl:template>

    <xsl:template match="checkbox">
        <div class="-chosen -k-spacer_t">
            <label class="-chosen_label"><input id="js-checkbox" type="checkbox" class="-chosen_input" name="rr1" data-validRules="required">
                <xsl:attribute name="name">
                    <xsl:value-of select="@name"/>
                </xsl:attribute>
                <xsl:attribute name="data-validRules">
                    <xsl:value-of select="validRules"/>
                </xsl:attribute>
            </input><xsl:value-of select="label"/></label>
        </div>
    </xsl:template>

    <xsl:template match="file">
        <div class="-form-line">
            <label class="-label -form-left">
                <xsl:attribute name="for">
                    <xsl:value-of select="@name"/>
                </xsl:attribute>
                <xsl:value-of select="label"/>
            </label>
            <div class="-form-right">
                <input class="-input-file" type="file">
                    <xsl:attribute name="id">
                        <xsl:value-of select="@name"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="@name"/>
                    </xsl:attribute>
                </input>
            </div>
        </div>
    </xsl:template>

    <xsl:template name="progress_bar">
        <xsl:param name="qCount" />
        <xsl:param name="i" />
        <xsl:if test="$i &lt;= $qCount">
            <li class="form-progress_list_item">
                <a class="form-progress_list_item_link">
                    <xsl:attribute name = "href">#<xsl:value-of select = "$i"/></xsl:attribute>
                </a>
            </li>
            <xsl:call-template name="progress_bar">
                <xsl:with-param name="i" select="$i + 1"/>
                <xsl:with-param name="qCount" select="$qCount"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

    <xsl:template match="form/form_questions/question">
        <div class="form-line -form-line">
            <label class="label -form-left">
                <xsl:attribute name="for">
                    <xsl:value-of select="@name"/>
                </xsl:attribute>
                <xsl:value-of select = "label"/>
            </label>
            <a class='js-questionLink'>
                <xsl:attribute name="name">anchor_<xsl:value-of select="@name"/></xsl:attribute>
            </a>
            <div class="-form-right">
                <xsl:apply-templates select="descr" />
                <xsl:apply-templates select="radioBtn" />
                <xsl:choose>
                    <xsl:when test="@type='text'">
                        <input class="-input-text -width-100">
                            <xsl:attribute name="id">
                                <xsl:value-of select="@name"/>
                            </xsl:attribute>
                            <xsl:attribute name="name">
                                <xsl:value-of select="@name"/>
                            </xsl:attribute>
                            <xsl:attribute name="data-validRules">
                                <xsl:value-of select="validRule"/>
                            </xsl:attribute>
                        </input>
                    </xsl:when>
                    <xsl:otherwise>
                        <textarea class="-textarea -width-100">
                            <xsl:attribute name="id">
                                <xsl:value-of select="@name"/>
                            </xsl:attribute>
                            <xsl:attribute name="name">
                                <xsl:value-of select="@name"/>
                            </xsl:attribute>
                            <xsl:attribute name="data-validRules">
                                <xsl:value-of select="validRule"/>
                            </xsl:attribute>
                        </textarea>
                    </xsl:otherwise>
                </xsl:choose>

            </div>
        </div>
    </xsl:template>

    <xsl:template match="descr">
        <p class="input-note">
           <xsl:value-of disable-output-escaping="yes" select="." />
        </p>
    </xsl:template>

    <xsl:template match="radioBtn">
        <span class="input-note -ui-group">
            <xsl:for-each select="item">
                <button class="-ui-group_item -btn" type="button">
                    <xsl:attribute name="data-radio">
                        <xsl:value-of select="../@name"/>
                    </xsl:attribute>
                    <xsl:attribute name="data-radioValue">
                        <xsl:value-of select="@value"/>
                    </xsl:attribute>
                    <xsl:value-of select="."/></button>
            </xsl:for-each>
        </span>
        <div class="-k-hide">
            <xsl:for-each select="item">
                <input type="radio">
                    <xsl:attribute name="name">
                        <xsl:value-of select="../@name"/>
                    </xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:value-of select="@value"/>
                    </xsl:attribute>
                </input>
            </xsl:for-each>
        </div>
    </xsl:template>

    <xsl:template match="page_code/footer">
        <footer class="footer">
            <p class="footer_content">
                Задание выполнил <xsl:value-of select="name"/>.
                <a>
                    <xsl:attribute name = "href">
                        <xsl:value-of select = "link"/>
                    </xsl:attribute>
                    Исходный код
                </a>.
            </p>
        </footer>
    </xsl:template>

</xsl:stylesheet>